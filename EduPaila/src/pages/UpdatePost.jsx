import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DOMPurify from 'dompurify';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [htmlFile, setHtmlFile] = useState(null);
  const [pdfUrlInput, setPdfUrlInput] = useState(''); // For entering the PDF URL
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        setPublishError(null);
        setFormData(data.posts[0]);
        setPdfUrlInput(data.posts[0].pdfUrl || '');
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, [postId]);

  // Handle image upload to Cloudinary
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const imageFormData = new FormData();
      imageFormData.append('file', file);
      imageFormData.append('upload_preset', 'edupaila'); // Replace with your preset
      imageFormData.append('cloud_name', 'de1hbyhq1'); // Replace with your cloud name
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/de1hbyhq1/image/upload',
        imageFormData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setImageUploadProgress(progress);
          },
        }
      );
      setImageUploadProgress(null);
      setImageUploadError(null);
      setFormData({ ...formData, image: res.data.secure_url });
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
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

  // Handle form submission (sending JSON data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        title: formData.title || '',
        content: formData.content || '',
        category: formData.category || 'uncategorized',
        image: formData.image || '',
        pdfUrl: pdfUrlInput || '',
      };

      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        }
      );

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
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title and Category Section */}
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
            value={formData.title || ''}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || 'uncategorized'}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        {/* Image Upload Section */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
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

        {/* HTML File Upload Section */}
        <div className="flex flex-col gap-4">
          <FileInput
            type="file"
            accept=".html"
            onChange={handleHtmlFileUpload}
            label="Upload HTML File"
          />
          {htmlFile && <p>Uploaded: {htmlFile}</p>}
        </div>

        {/* PDF URL Input Section */}
        <div className="flex flex-col gap-4">
          <TextInput
            type="text"
            placeholder="Enter PDF URL (e.g., Google Drive or Cloudinary link)"
            value={pdfUrlInput}
            onChange={(e) => setPdfUrlInput(e.target.value)}
          />
        </div>

        {/* Rich Text Editor for Content */}
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
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update Post
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
