import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaUpload } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import DOMPurify from "dompurify";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [htmlFile, setHtmlFile] = useState(null);
  const [pdfUrlInput, setPdfUrlInput] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    image: "",
    content: "",
  });
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
          setPublishError(data.message);
          return;
        }
        setPublishError(null);
        setFormData({
          title: data.posts[0].title || "",
          category: data.posts[0].category || "uncategorized",
          image: data.posts[0].image || "",
          content: data.posts[0].content || "",
        });
        setPdfUrlInput(data.posts[0].pdfUrl || "");
      } catch (error) {
        setPublishError("Error fetching post details");
      }
    };
    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      imageFormData.append("upload_preset", "edupaila");
      imageFormData.append("cloud_name", "de1hbyhq1");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/de1hbyhq1/image/upload",
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
      setFormData({ ...formData, image: res.data.secure_url });
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setPublishError("User not authenticated");
      return;
    }

    try {
      const dataToSend = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        image: formData.image,
        pdfUrl: pdfUrlInput || "",
      };

      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || "Failed to update post");
        return;
      }

      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            value={formData.category}
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

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            color="green"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress}%`}
              />
            ) : (
              <div className="flex">
                Upload <FaUpload className="ml-3" />
              </div>
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

        <FileInput
          type="file"
          accept=".html"
          onChange={handleHtmlFileUpload}
          label="Upload HTML File"
        />
        {htmlFile && <p>Uploaded: {htmlFile}</p>}

        <TextInput
          type="text"
          placeholder="Enter PDF URL"
          value={pdfUrlInput}
          onChange={(e) => setPdfUrlInput(e.target.value)}
        />

        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        <Button type="submit" color="green" outline>
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
