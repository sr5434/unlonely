import { UserCircleIcon, CpuChipIcon } from '@heroicons/react/24/outline'

export default function Message({ role, message }: { role: string, message: string }) {
    return (
        <div className='block mb-2 pt-6 text-sm font-medium text-gray-900 dark:text-white'>
            {role === "user" ? <UserCircleIcon className="h-6 w-6 inline-block" /> : <CpuChipIcon className="h-6 w-6 inline-block" />}
            <p className="inline-block ml-2 bg-slate-500 rounded-3xl p-1 text-wrap">{message}</p>
        </div>
    )
}