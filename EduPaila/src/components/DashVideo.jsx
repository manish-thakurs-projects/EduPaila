import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';

export default function DashVideo() {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [videoIdToDelete, setVideoIdToDelete] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/video/getvideos?userId=${currentUser._id}`);
        if (res.status === 200) {
          setVideos(res.data);
          if (res.data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    if (currentUser.isAdmin) {
      fetchVideos();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = videos.length;
    try {
      const res = await axios.get(
        `/api/video/getvideos?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      if (res.status === 200) {
        setVideos((prev) => [...prev, ...res.data]);
        if (res.data.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching more videos:', error);
    }
  };

  const handleDeleteVideo = async () => {
    setShowModal(false);
    try {
      await axios.delete(`/api/video/delete/${videoIdToDelete}`);
      setVideos((prev) => prev.filter((video) => video._id !== videoIdToDelete));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && videos.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Video thumbnail</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {videos.map((video) => (
                <Table.Row key={video._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(video.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/video/${video.slug}`}>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/video/${video.slug}`}
                    >
                      {video.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{video.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setVideoIdToDelete(video._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/updatevideo/${video._id}`}
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no videos yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this video?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteVideo}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className='flex justify-center items-center'>
        <Button className='mt-10 flex justify-center items-center w-4/5' color='blue' pill outline>
          <Link to="/createvideo" className='flex justify-center items-center'>
            Create Video
          </Link>
        </Button>
      </div>
    </div>
  );
}