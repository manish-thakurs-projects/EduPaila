import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [htmlFile, setHtmlFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  // Handle image upload to Cloudinary
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      setImageUploadError(null);
      setImageUploadProgress(0);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Image upload failed');
      }

      const data = await res.json();
      setFormData({ ...formData, image: data.secure_url });
      setImageUploadProgress(null);
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.error(error);
    }
  };

  // Handle HTML file upload and extract/upload images
  const handleHtmlFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        let rawHtml = reader.result;

        // Clean up MS Word generated HTML
        rawHtml = cleanWordHtml(rawHtml);
        
        const sanitizedHtml = DOMPurify.sanitize(rawHtml);
        const imageUrls = await uploadImagesInHtml(sanitizedHtml); // Upload the images and get their URLs
        const updatedHtml = updateImageUrlsInHtml(sanitizedHtml, imageUrls);
        setFormData({ ...formData, content: updatedHtml });
      };
      reader.readAsText(file);
      setHtmlFile(file.name);
    }
  };

  // Clean up MS Word HTML content by removing unnecessary tags and XML
  const cleanWordHtml = (html) => {
    // Remove MS Word specific elements (XML, metadata, comments, etc.)
    const cleanedHtml = html
      .replace(/<!--.*?-->/gs, '')  // Remove all comments
      .replace(/<xml.*?>.*?<\/xml>/gs, '')  // Remove all XML tags
      .replace(/<meta.*?>/gs, '')  // Remove meta tags
      .replace(/style="[^"]*"/gs, '') // Remove inline styles if needed (optional)
      .replace(/<o:p>.*?<\/o:p>/gs, '') // Remove Office specific tags (like <o:p>)
      .replace(/<\/?span.*?>/gs, '')  // Remove span tags that MS Word often uses
      .replace(/<w:.*?>.*?<\/w:.*?>/gs, ''); // Remove Word-specific namespaces and tags
    return cleanedHtml;
  };

  // Upload images found in the HTML and return their URLs
  const uploadImagesInHtml = async (html) => {
    const imageUrls = [];
    const imgTags = Array.from(new DOMParser().parseFromString(html, 'text/html').querySelectorAll('img'));

    for (const img of imgTags) {
      const imgSrc = img.src;
      if (imgSrc && !imgSrc.startsWith('http')) { // If it's a local image
        try {
          const uploadedUrl = await uploadImageToCloudinary(imgSrc); // Upload and get URL
          imageUrls.push({ originalSrc: imgSrc, uploadedUrl });
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
    }
    return imageUrls;
  };

  // Replace image `src` with uploaded URLs in the HTML content
  const updateImageUrlsInHtml = (html, imageUrls) => {
    let updatedHtml = html;
    imageUrls.forEach(({ originalSrc, uploadedUrl }) => {
      updatedHtml = updatedHtml.replace(new RegExp(originalSrc, 'g'), uploadedUrl);
    });
    return updatedHtml;
  };

  // Function to upload individual image to Cloudinary
  const uploadImageToCloudinary = async (imageSrc) => {
    const formData = new FormData();
    formData.append('file', imageSrc); // Assuming imageSrc is a File or Blob
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);

    const res = await fetch(import.meta.env.VITE_CLOUDINARY_API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Image upload failed');
    }
    const data = await res.json();
    return data.secure_url; // Return the uploaded image URL
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Course</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        FOR TITLE
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            value={formData.category || "uncategorized"}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="Notes">Notes</option>
            <option value="Mcq">Mcq</option>
            <option value="Numericals">Numericals</option>
          </Select>
        </div>
        FOR IMAGE
        <div className="flex gap-6 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className='w-full'
          />
          <Button
            type="button"
            color="green"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={!!imageUploadProgress}
            className='w-full'
          >
            {imageUploadProgress ? (
              <div className="w-15 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        
        <div className="flex flex-col gap-4">
          FOR HTML FILES
          <FileInput
            type="file"
            accept=".html"
            onChange={handleHtmlFileUpload}
            label="Upload HTML File"
          />
          {htmlFile && <p>Uploaded: {htmlFile}</p>}
        </div>
        <ReactQuill
          theme="snow"
          value={formData.content || ''}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" color='green'>
          UPLOAD
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
