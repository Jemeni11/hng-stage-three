"use client";
import Image from "next/image";
import { Images } from "./image";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
  DropResult,
} from "@hello-pangea/dnd";
import { useState, useEffect } from "react";

export default function Home() {
  const [isBrowser, setIsBrowser] = useState(false);
  const [inputState, setInputState] = useState("");

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");
  }, []);

  const items =
    inputState.trim() === ""
      ? [...Images]
      : [...Images].filter((image) =>
          image.name.toLowerCase().includes(inputState.toLowerCase())
        );

  const handleOndragEnd: OnDragEndResponder = (result: DropResult) => {
    // Avoiding the error when moving the items out of their droppable area.
    if (!result.destination) return;
    //Retrieving the item from its previous position
    const [reorderedItem] = items.splice(result.source.index, 1);
    //Drop the item at its new postition
    items.splice(result.destination.index, 0, reorderedItem);
  };

  return (
    <main className="flex min-h-screen px-12 flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-6xl text-white font-bold mt-8">PicFlow</h1>
        <div className="relative">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            value={inputState}
            onChange={(event) => setInputState(event.target.value)}
            id="Search"
            placeholder="Search for..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
      {isBrowser && (
        <DragDropContext onDragEnd={handleOndragEnd}>
          <Droppable droppableId="droppable-1">
            {(provided) => {
              return (
                <ul
                  className="grid gap-x-6 gap-y-10 my-12 grid-cols-1 w-1/3 mx-auto"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {items.map(({ image, name }, index) => (
                    <Draggable
                      key={image.src}
                      draggableId={image.src}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <li>
                            <Image
                              src={image.src}
                              alt={name}
                              width={image.width}
                              height={image.height}
                              placeholder="blur"
                              blurDataURL={image.blurDataURL}
                              className="rounded-xl w-full"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            />
                            <p className="text-4xl text-white font-bold mt-4 text-center">
                              {name}
                            </p>
                          </li>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              );
            }}
          </Droppable>
        </DragDropContext>
      )}
    </main>
  );
}
