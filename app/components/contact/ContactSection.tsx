'use client'

import { useState, FormEvent } from 'react'
import { ChevronsRight } from 'lucide-react'
import CustomButton from '../CustomButton'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setFormData({
      name: '',
      email: '',
      message: '',
    })
  }

  return (
    <section className="bg-[#0A0A0B] py-6 lg:py-14 md:px-8">
      <div className="max-w-7xl mx-auto rounded-3xl md:border border-white/10 bg-[#111214] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left: form */}
        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="font-anton text-3xl sm:text-4xl text-white uppercase mb-2 text-center md:text-start">
            Prefer To Write To Us?
          </h2>

          <p className="font-archivo text-white/50 text-md mb-6  text-center md:text-start max-w-md">
            You can also reach out by filling out the form below. We aim to
            respond to all enquiries within two business days.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block font-archivo font-semibold text-white text-sm mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g jhon"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl bg-[#0A0A0B] border border-white/10 px-5 py-4 text-white placeholder:text-white/30 font-archivo text-base sm:text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-archivo font-semibold text-white text-sm mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl bg-[#0A0A0B] border border-white/10 px-5 py-4 text-white placeholder:text-white/30 font-archivo text-base sm:text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-archivo font-semibold text-white text-sm mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Type here..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-xl bg-[#0A0A0B] border border-white/10 px-5 py-4 text-white placeholder:text-white/30 font-archivo text-base sm:text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="text-center lg:text-start">
              <CustomButton text="Send Message" type="submit" animate={true} />
            </div>
          </form>
        </div>

        {/* Right: image + overlay info */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div
            className="relative min-h-100 lg:min-h-full flex items-end rounded-4xl p-8"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(10,10,11,0.1) 0%, rgba(10,10,11,0.85) 100%), url('/assets/contact-gym-photo.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 flex-wrap">
              <div>
                <p className="font-archivo text-white/60 text-sm mb-1 text-center md:text-start">
                  For Enquires
                </p>
                <p className="font-archivo font-semibold text-white text-lg">
                  hello@m4gym.com
                </p>
              </div>

              <span className="w-full md:w-px h-px md:h-12 bg-[#858585] md:bg-white/20 sm:block" />

              <div>
                <p className="font-archivo text-white/60 text-sm mb-1 text-center md:text-start">
                  Office Address
                </p>
                <p className="font-archivo font-semibold text-white text-lg">
                  123 Demo St, City, Country
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
