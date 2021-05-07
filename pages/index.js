import { useState } from 'react'
import 'tailwindcss/tailwind.css'

export default function Home() {
  // once the user submitted the form the email will be set
  const [email, setEmail] = useState(null)

  const sendConfirmationCode = async (event) => {
    event.preventDefault()

    const email = event.target.email.value
    const data = {
      name: event.target.name.value,
      email,
      companySize: event.target.company_size.value,
    }
    console.log(data)
    const res = await fetch('/api/register', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    setEmail(email)
  }

  const EmailSent = () => {
    return (
      <main className="mt-12 lg:mt-32">
        <section className="container w-full max-w-md m-auto items-center">
          <div className="text-center py-3 px-12 bg-green-400 mt-5 mr-5 rounded-md text-white text-lg focus:outline-none w-full">
            Check your mailbox, the confirmation code was sent to{' '}
            <span data-cy="sent-email-to" className="font-bold">
              {email}
            </span>
          </div>
        </section>
      </main>
    )
  }

  if (email) {
    return <EmailSent />
  }

  return (
    <main className="mt-12 lg:mt-32">
      <section className="container mx-auto px-6">
        <div className="w-full lg:flex items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-md lg:text-2xl text-gray-600">
              Cypress Test Runner to
            </h2>
            <h1 className="text-5xl lg:text-6xl font-bold text-teal-600 mb-2 lg:mb-6">
              Automate your email HTML flow testing
            </h1>
            <p className="text-md lg:text-xl font-light text-gray-800 mb-8">
              Cypress is an open-source MIT-licensed powerful end-to-end test
              runner for anything that runs in the browser, including HTML
              emails.
            </p>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-24">
            <form
              onSubmit={sendConfirmationCode}
              className="bg-gray-100 shadow-sm rounded-md p-8"
            >
              <div className="mb-6">
                <label htmlFor="name" className="mb-3 block text-gray-700">
                  Full name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="mb-3 block text-gray-700">
                  Email address:
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full"
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="company_size"
                  className="mb-3 block text-gray-700"
                >
                  Company size:
                </label>
                <select
                  id="company_size"
                  className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="1">1-10</option>
                  <option value="2">10-50</option>
                  <option value="3">50-100</option>
                  <option value="4">100+</option>
                </select>
              </div>
              <button
                type="submit"
                className="py-3 px-12 bg-green-300 hover:bg-green-600 mr-5 rounded-md text-white text-lg focus:outline-none w-full"
              >
                Get confirmation code
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
