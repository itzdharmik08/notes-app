
import React, { useState, useEffect } from "react";
import { X } from 'lucide-react';

const Note = () => {

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');

  // Load notes from localStorage on component mount
  const [task, setTask] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Save notes to localStorage whenever task array changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(task));
  }, [task]);

  const submitNote = (e) => {
    e.preventDefault();

    // Prevent adding notes with missing fields
    if (!title.trim() || !details.trim()) {
      setError("Both title and details are required.");
      return;
    }

    setError('');

    console.log({ title, details });

    const copytask = [...task]
    copytask.push({ title, details })
    setTask(copytask)

    setTitle('');
    setDetails('');
  };

  const deleteNote = (id) => {
    const copytask = [...task];

    copytask.splice(id, 1)
    setTask(copytask)
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="p-3 sm:p-5">
        <h1 className="text-lg sm:text-xl px-3 sm:px-5 font-bold text-center bg-orange-300 rounded text-black p-2">NOTEBOOK</h1>
      </div>
      <form className="flex flex-col lg:flex-row justify-between items-center lg:items-start font-semibold p-4 sm:p-8 lg:p-16 gap-6 sm:gap-8">

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            className="w-[85%] sm:w-[70%] lg:w-[60%] xl:w-[50%] object-contain transition-transform hover:scale-105 duration-300"
            src="https://static.vecteezy.com/system/resources/thumbnails/049/578/155/small/a-black-and-white-drawing-of-a-man-writing-png.png"
            alt="notes"
          />
        </div>

        <div className="flex gap-4 sm:gap-5 flex-col w-full lg:w-1/2">
          <input
            className="px-4 sm:px-5 py-2 bg-black text-white border-2 outline-none rounded-lg w-full focus:border-orange-300 transition-colors"
            type="text"
            placeholder="Enter Notes Heading"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (error) setError('');
            }}
          />
          <textarea
            className="px-4 sm:px-5 py-2 bg-black text-white border-2 outline-none rounded-lg w-full h-28 sm:h-32 focus:border-orange-300 transition-colors"
            type="text"
            placeholder="Enter Notes Details"
            value={details}
            onChange={(e) => {
              setDetails(e.target.value)
              if (error) setError('');
            }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="px-5 py-2 active:bg-gray-400 bg-white text-black border-2 outline-none rounded-lg w-full hover:bg-orange-300 hover:border-orange-300 transition-colors"
            type="submit"
            onClick={(e) => {
              submitNote(e);
            }}
          >
            Add Note
          </button>
        </div>
      </form>
      <h1 className="text-lg sm:text-xl font-bold text-center bg-orange-300 rounded text-black p-2 mx-3 sm:mx-4">Recent Notes</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 p-3 sm:p-6 lg:p-10">
        {task.map(function (elem, id) {
          return <div key={id} className="relative bg-cover bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] h-auto p-3 sm:p-6 text-center w-full rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow break-words">
            <h2 onClick={() => {
              deleteNote(id)
            }} className="absolute bg-red-500 hover:bg-red-600 transition-colors rounded-full cursor-pointer font-xs top-2 sm:top-5 p-1.5 right-2 sm:right-5"><X size={14} color="#ffffff" strokeWidth={1.75} /></h2>
            <h3 className="font-bold text-base sm:text-lg md:text-xl mt-1">{elem.title}</h3>
            <p className="mt-1 sm:mt-2 text-gray-500 flex-wrap break-words leading-tight text-xs sm:text-sm md:text-base">{elem.details}</p>
          </div>
        })}

      </div>
    </div>
  );
};

export default Note;
