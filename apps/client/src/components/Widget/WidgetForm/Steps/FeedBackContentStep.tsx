import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../../services/api";
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
  const [email, setEmail] = useState('')
  
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleSubmitFeedback( event: FormEvent){
    event.preventDefault()

    if ( feedbackTypeInfo.title == 'Email'){
      await api.post('/email', { description, name, company, email})
    }

    if ( feedbackTypeInfo.title == 'Feedback'){
      await api.post('/feedback', { description, name, company})
    }

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
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea 
        className="w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
        placeholder="Feel free to contact me"
        name="description"
        onChange={event => setDescription(event.target.value)}
        />
        <div className="flex flex-row md:flex-col justify-between w-full">
          <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Name" 
          onChange={event => setName(event.target.value)}
          className=" w-full sm:w-40 text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none mr-4 mb-4"/>
          <input 
          type="text" 
          name="email" 
          id="email" 
          placeholder="Email" 
          onChange={event => setEmail(event.target.value)}
          className=" w-full sm:w-40 text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none mr-4 mb-4"/>
          <input 
          type="text" 
          name="company" 
          id="company" 
          placeholder="Company" 
          onChange={event => setCompany(event.target.value)}
          className="w-full sm:w-40 text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none mb-4" />
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
