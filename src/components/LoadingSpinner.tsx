import { memo } from 'react'

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-warm-50/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-warm-100 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-warm-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-warm-700 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-lg font-medium text-stone-850">Laddar...</p>
        </div>
      </div>
    </div>
  )
}

export default memo(LoadingSpinner)