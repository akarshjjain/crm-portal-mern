import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/authContext'; // Import useAuth for permission checks

const Taskemployeeview = () => {
  const { taskId } = useParams(); // Get the taskId from the URL parameters
  const navigate = useNavigate();
  const { user: currentUser, loading: authLoading } = useAuth(); // Get current user for permissions
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // CRITICAL FIX: Ensure API_BASE_URL matches your backend server's port (3000)
  const API_BASE_URL = 'http://localhost:3000/api'; 

  const fetchTaskDetails = useCallback(async () => {
    // Only fetch if auth state is resolved and we have a task ID
    if (authLoading || !taskId) {
        return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log(`Attempting to fetch task details from: ${API_BASE_URL}/task/${taskId}`);
      const response = await fetch(`${API_BASE_URL}/task/${taskId}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Message:`, errorText); 
        throw new Error(`Failed to fetch task details: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Task details fetched successfully:', data);

      // Implement permission check: employee can only view their own tasks
      if (currentUser?.isLoggedIn && currentUser?.role === 'employee' && data.taskOwner !== currentUser.name) {
          setError('You do not have permission to view this task.');
          setTask(null); // Clear task data if not permitted
      } else {
          setTask(data);
      }
    } catch (err) {
      console.error('Error fetching task details:', err);
      setError(err.message);
      setTask(null); // Clear task on error
    } finally {
      setLoading(false);
    }
  }, [taskId, currentUser, authLoading]);

  useEffect(() => {
    fetchTaskDetails();
  }, [fetchTaskDetails]);

  // Permission check for edit and delete actions
  const canEditOrDelete = (taskOwner) => {
    if (!currentUser?.isLoggedIn) return false;
    return currentUser.role === 'admin' || (currentUser.role === 'employee' && currentUser.name === taskOwner);
  };

  // Handle edit action (placeholder for now)
  const handleEdit = () => {
    console.log('Editing task:', task);
    // In a full implementation, you'd likely open the CreateTaskModal with this task data
    // For now, we'll just log and maybe navigate to a generic edit path if one existed:
    // navigate(`/employee-dashboard/tasks/edit/${taskId}`);
    alert('Edit functionality not yet implemented on this view. You can edit from the main task list.');
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!canEditOrDelete(task?.taskOwner)) {
        alert("You do not have permission to delete this task.");
        return;
    }

    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        console.log(`Attempting to delete task: ${API_BASE_URL}/task/${taskId}`);
        const response = await fetch(`${API_BASE_URL}/task/${taskId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`HTTP error! Status: ${response.status}, Message:`, errorText);
          throw new Error(`Failed to delete task: ${response.status} - ${errorText}`);
        }

        console.log('Task deleted successfully');
        navigate('/employee-dashboard/tasks'); // Navigate back to the tasks list after deletion
      } catch (err) {
        console.error('Error deleting task:', err);
        setError(`Failed to delete task: ${err.message}`);
      }
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading authentication state...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
        <div className="text-gray-600 text-lg">Loading task details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 font-sans p-6">
        <div className="text-red-700 text-lg font-semibold mb-4">Error: {error}</div>
        <button
          onClick={() => navigate('/employee-dashboard/tasks')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tasks
        </button>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Not Found</h2>
        <p className="text-gray-600">The task with ID "{taskId}" could not be found or you do not have permission to view it.</p>
        <button
          onClick={() => navigate('/employee-dashboard/tasks')}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          
          <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
          {/* <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              disabled={!canEditOrDelete(task.taskOwner)}
              className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Edit Task"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={!canEditOrDelete(task.taskOwner)}
              className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete Task"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div> */}
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors text-sl font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tasks
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          {/* <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Task ID</p>
            <p className="text-base text-gray-900 font-semibold">{task._id}</p>
          </div> */}
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Task Owner</p>
            <p className="text-base text-gray-900">{task.taskOwner || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Subject</p>
            <p className="text-base text-gray-900">{task.subject || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Due Date</p>
            <p className="text-base text-gray-900">{task.dueDate || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Contact</p>
            <p className="text-base text-gray-900">{task.contact || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Account</p>
            <p className="text-base text-gray-900">{task.account || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="text-base text-gray-900">{task.status || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Priority</p>
            <p className="text-base text-gray-900">{task.priority || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Reminder</p>
            <p className="text-base text-gray-900">{task.reminder ? 'Yes' : 'No'}</p>
          </div>
          <div className="detail-item">
            <p className="text-sm font-medium text-gray-500">Repeat</p>
            <p className="text-base text-gray-900">{task.repeat ? 'Yes' : 'No'}</p>
          </div>
          <div className="md:col-span-2 detail-item">
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="text-base text-gray-900">{task.description || 'N/A'}</p>
          </div>
          <div className="md:col-span-2 detail-item">
            <p className="text-sm font-medium text-gray-500">Created At</p>
            <p className="text-base text-gray-900">{task.createdAt ? new Date(task.createdAt).toLocaleString() : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskemployeeview;
