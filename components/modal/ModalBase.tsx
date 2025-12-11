import React from 'react'
import { Transition } from '@headlessui/react'

type Props = {
  body: React.ReactNode;
  actionBar: React.ReactNode;
}

const ModalBase = ({ body, actionBar }: Props) => {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"
      id="timestampmodal" tab-index="-1" aria-hidden="true">
      <div className="fixed inset-0 transition-all backdrop-blur-lg bg-black/50"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative rounded-2xl border-2 border-brand-primary/30 text-left overflow-hidden  
            shadow-2xl shadow-brand-primary/20 transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                {body}
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-brand-dark px-4 py-3 sm:px-6 flex flex-row justify-end gap-3 border-t border-gray-700">
              {actionBar}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ModalBase;
