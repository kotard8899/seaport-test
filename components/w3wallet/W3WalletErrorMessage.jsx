function W3WalletErrorMessage () {
  const errorMessage = "123"
  return (
    <div className="flex fixed inset-0 backdrop-blur">
      <div className="m-auto w-80">
        <div className="shadow-2xl m-4 rounded-2xl border p-4 bg-white space-y-4">
          <header className="text-red-500">Error</header>
          <div className="">{errorMessage}</div>
          <footer className="text-center">
            <div className="border rounded-lg p-2 text-center">Click Me</div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default W3WalletErrorMessage
