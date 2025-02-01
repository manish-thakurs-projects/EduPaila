import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp, FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
      {/* Avatar */}
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
          src={user.profilePicture || '/default-avatar.png'}
          alt={user.username || 'Anonymous User'}
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        {/* Header (Username + Timestamp) */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-white text-base">
            {user.username || 'Anonymous User'}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {/* Comment Body */}
        {isEditing ? (
          <>
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={4}
              className="w-full resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" color="teal" onClick={handleSave}>
                Save
              </Button>
              <Button size="sm" color="gray" outline onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.content}</p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          {/* Like Button */}
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`flex items-center gap-1 hover:text-teal-600 ${
              currentUser && comment.likes.includes(currentUser._id) && 'text-teal-600'
            }`}
          >
            <FaThumbsUp className="text-sm" />
            <span>{comment.numberOfLikes > 0 && comment.numberOfLikes}</span>
          </button>

          {/* Edit/Delete Buttons */}
          {currentUser &&
            (currentUser._id === comment.userId || currentUser.isAdmin) && (
              <>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex items-center gap-1 hover:text-blue-500"
                >
                  <FaEdit className="text-sm" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(comment._id)}
                  className="flex items-center gap-1 hover:text-red-500"
                >
                  <FaTrash className="text-sm" />
                  <span>Delete</span>
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
}