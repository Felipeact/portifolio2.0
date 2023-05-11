import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../CloseButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep( { feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps ) {
  const [description, setDescription ] = useState('')
  const [name, setName ] = useState('')
  const [company, setCompany] = useState('')
  
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  function handleSubmitFeedback( event: FormEvent){
    event.preventDefault()

    if ( feedbackTypeInfo.title == 'Email'){
      console.log('i am at email')
    }

    if ( feedbackTypeInfo.title == 'Feedback'){
      console.log('i am at Feedback')
    }

    console.log({
      description,
      name,
      company
    })

    onFeedbackSent();
  }

  return (
    <>
    <header>
        <button 
        onClick={onFeedbackRestartRequested}
        type="button" 
        className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4 h-4"/>
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img 
          className="w-6 h-6"
          // src={feedbackTypeInfo.image.source} 
          // alt={feedbackTypeInfo.image.alt} 
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea 
        className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        placeholder="Feel free to contact me"
        name="description"
        onChange={event => setDescription(event.target.value)}
        />
        <div className="flex justify-between w-full">
          <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Name" 
          onChange={event => setName(event.target.value)}
          className=" w-40 text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none mr-4"/>
          <input 
          type="text" 
          name="company" 
          id="company" 
          placeholder="Company" 
          onChange={event => setCompany(event.target.value)}
          className="w-40 text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none" />
        </div>
        <footer className="flex gap-2 mt-2">
          
          <button
            type="submit"
            disabled={description.length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Send feedback
          </button>
        </footer>
      </form>

      </>
  )
}