export function Contact() {
  return (
    <div className="max-w-2xl mx-auto p-6 pt-8">
      <h1 className="text-3xl font-bold mb-8">تماس با ما</h1>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">نام و نام خانوادگی</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ایمیل</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">موضوع</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">پیام</label>
          <textarea
            rows={5}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          ارسال پیام
        </button>
      </form>
    </div>
  );
}