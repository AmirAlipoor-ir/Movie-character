import { LoaderIcon } from "react-hot-toast"

function Loading() {
  return (
    <div className="flex items-center gap-3">
    <p>is loading</p>
    <LoaderIcon className="w-5 h-5"/>
    </div>
  )
}

export default Loading
