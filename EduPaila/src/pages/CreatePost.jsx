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

      const imageFormData = new FormData();
      imageFormData.append('file', file);
      imageFormData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_API_URL, {
        method: 'POST',
        body: imageFormData,
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

  // Handle HTML file upload and sanitize content
  const handleHtmlFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const sanitizedHtml = DOMPurify.sanitize(reader.result);
        setFormData({ ...formData, content: sanitizedHtml });
      };
      reader.readAsText(file);
      setHtmlFile(file.name);
    }
  };

  // Handle form submission (using JSON now, since we’re only sending text data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        title: formData.title || '',
        content: formData.content || '',
        category: formData.category || 'uncategorized',
        image: formData.image || '',
        pdfUrl: formData.pdfUrl || '', // Use the PDF URL provided via text input
      };

      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen mb-12">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Course</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        STEP 1 : IMAGE
        <div className="flex gap-6 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
          <Button
            type="button"
            color="green"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={!!imageUploadProgress}
            className="w-full"
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
       STEP 2 : URL FOR DRIVE

        {/* PDF URL Input Section */}
        <div className="flex flex-col gap-4">
          <TextInput
            type="text"
            placeholder="Enter PDF URL (e.g., Google Drive or Cloudinary link)"
            value={formData.pdfUrl || ''}
            onChange={(e) =>
              setFormData({ ...formData, pdfUrl: e.target.value })
            }
          />
        </div>

        {/* HTML File Upload Section */}
        <div className="flex flex-col gap-4">
          OR INSERT HTML
          <FileInput
            type="file"
            accept=".html"
            onChange={handleHtmlFileUpload}
            label="Upload HTML File"
          />
          {htmlFile && <p>Uploaded: {htmlFile}</p>}
        </div>

        {/* Title and Category Section */}
          STEP 3 : TITLE & CATEGORY
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
            value={formData.category || 'uncategorized'}
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

        {/* Rich Text Editor for Content */}
        FOR TEXT FILE
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
        <Button type="submit" color="green">
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
