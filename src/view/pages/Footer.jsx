
function Footer() {
  return (
    <footer className="bg-white border-t dark:border-cyan-950 border-black/10 dark:bg-gray-900 mt-[94px]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BCC</span>
          </a>

          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">BCC™</a>. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
