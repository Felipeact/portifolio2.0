import { useState } from "react";


import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedBackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedBackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Email',
    // image: {
    //   source: bugImageUrl,
    //   alt: 'Imagem de um inseto'
    // }
  },
  OTHER: {
    title: 'Feedback',
    // image: {
    //   source: thoughtImageUrl,
    //   alt: 'Imagem de uma nuvem de pensamento'
    // }
  },

}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm(){
  const [ feedbackType, setFeedbackType ] = useState<FeedbackType | null>(null)
  const [ feedbackSent, setFeedbackSent ] = useState(false)
  
  function handleRestartFeedback(){
    setFeedbackSent(false)
    setFeedbackType(null)
  }
  return(
    <div className="z-10 bg-zinc-900  p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      

      { feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
      ) : (
        <>
          {!feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
      ) : (
        <FeedbackContentStep 
        feedbackType={feedbackType} 
        onFeedbackRestartRequested={handleRestartFeedback} 
        onFeedbackSent={() => setFeedbackSent(true)}/>
      )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Designed with 💖 by Felipe Viana
      </footer>
    </div>
  )
}