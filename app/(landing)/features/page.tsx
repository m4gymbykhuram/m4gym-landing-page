'use client'

import CustomButton from '@/app/components/CustomButton'
import TitleWithLines from '@/app/components/TitleWithLines'
import { fadeUp } from '@/lib/motion-variants'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpDown, Building2, Clock, GitBranch } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import type { ReactNode } from 'react'

const works = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Automate everyday tasks',
  },
  {
    icon: Clock,
    title: 'Multi locations',
    description: 'Manage every branch',
  },
  {
    icon: Clock,
    title: 'Easy Attendance',
    description: 'seamless check-ins',
  },
]

const ownerFeatures = [
  {
    label: 'Real-Time Business Dashboard',
    title: 'Real-Time Business Dashboard',
    description:
      'Track branch activity, revenue, attendance, and operations from one command center built for owners.',
    image: '/assets/dashboard-mockup.png',
    imageAlt: 'M4GYM business dashboard preview',
    fit: 'contain',
  },
  {
    label: 'Member Management',
    title: 'Member Management',
    description:
      'View member details, requests, plans, and account status without moving between disconnected tools.',
    image: '/assets/member-bg.jpg',
    imageAlt: 'Gym member management preview',
    fit: 'cover',
  },
  {
    label: 'Class & Schedule Oversight',
    title: 'Class & Schedule Oversight',
    description:
      'Keep class schedules, trainer assignments, and attendance windows clear for every location.',
    image: '/assets/calendar.png',
    imageAlt: 'Class and schedule calendar preview',
    fit: 'contain',
  },
  {
    label: 'Revenue & Financial Reports',
    title: 'Revenue & Financial Reports',
    description:
      'Review payment activity and revenue records with a focused owner view for smarter decisions.',
    image: '/assets/payment_records.png',
    imageAlt: 'Payment records preview',
    fit: 'contain',
  },
  {
    label: 'Equipment & Maintenance Tracking',
    title: 'Equipment & Maintenance Tracking',
    description:
      'Monitor equipment status, service needs, and inventory visibility before small issues become daily blockers.',
    image: '/assets/equipment.png',
    imageAlt: 'Equipment maintenance preview',
    fit: 'contain',
  },
]

const roleTabs = [
  {
    label: 'Calendar & Schedule',
    title: 'Attendance & Calendar',
    description:
      'Manage staff schedules, member check-ins, and calendar activity from one shared role-friendly workspace.',
    image: '/assets/calendar.png',
    imageAlt: 'Calendar and schedule preview',
    fit: 'contain',
  },
  {
    label: 'Profile Management',
    title: 'Profile Management',
    description:
      'Give each role a clean profile view for member details, assigned plans, activity history, and next actions.',
    image: '/assets/member-bg.jpg',
    imageAlt: 'Profile management preview',
    fit: 'cover',
  },
  {
    label: 'Activity & Updates',
    title: 'Activity & Updates',
    description:
      'Keep managers, trainers, and members aligned with updates that make recent work easy to understand.',
    image: '/assets/dashboard-mockup.png',
    imageAlt: 'Activity dashboard preview',
    fit: 'contain',
  },
  {
    label: 'Role-Based Access',
    title: 'Role-Based Access',
    description:
      'Show owners, managers, trainers, and members only the tools and information they need.',
    image: '/assets/manager-bg.jpg',
    imageAlt: 'Role based access preview',
    fit: 'cover',
  },
]

const managementTabs = [
  {
    label: 'Goals & Workout plans',
    title: 'Goals & Workout Plans',
    description:
      'Create, assign, and adjust workout plans so trainers can guide every member with clearer goals.',
    image: '/assets/trainer-bg.jpg',
    imageAlt: 'Workout plans preview',
    fit: 'cover',
  },
  {
    label: 'Attendance & Check In',
    title: 'Attendance & Check In',
    description:
      'Support fast check-ins and clean attendance records for staff, members, and daily operations.',
    image: '/assets/calendar.png',
    imageAlt: 'Attendance check-in preview',
    fit: 'contain',
  },
  {
    label: 'Payment Records',
    title: 'Payment Records',
    description:
      'Keep payment history organized and visible so financial follow-up is simple for every branch.',
    image: '/assets/payment_records.png',
    imageAlt: 'Payment records preview',
    fit: 'contain',
  },
  {
    label: 'Inventory & Stocks',
    title: 'Inventory & Stocks',
    description:
      'Track stock movement, supplies, and inventory needs with a clear operational view.',
    image: '/assets/inventory.png',
    imageAlt: 'Inventory stocks preview',
    fit: 'contain',
  },
]

const FeaturesPage = () => {
  return (
    <div className="relative w-screen overflow-hidden bg-[#080809]">
      <div
        className="relative bg-[#0A0A0B] z-10 w-full pt-28 md:px-20 md:pt-36 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 flex-1"
        style={{
          backgroundImage: "url('/assets/blogs-banner-bg.jpeg')",
          backgroundPosition: '100%',
          backgroundSize: 'cover',
        }}
      >
        <div className="relative w-full md:w-1/2 flex flex-col items-center md:items-start justify-center gap-4">
          <TitleWithLines title="Features" showLeftLine={false} />
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="font-anton text-center md:text-start text-4xl sm:text-4xl xl:text-[44px] uppercase text-white leading-tight"
          >
            Every part of your gym, in <br /> one system .
          </motion.h2>
          <p className="text-md text-[#858585] max-w-125">
            Stop switching between spreadsheets, WhatsApp groups, payment apps,
            and attendance sheets. M4GYM keeps your owners, managers, trainers,
            and members connected in one powerful workspace.
          </p>
          <CustomButton text="Explore Features" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="flex-1 relative flex items-center justify-center w-full max-w-2xl  lg:max-w-none"
        >
          <Image
            src={'/assets/feature-banner-group.png'}
            alt="features"
            height={600}
            width={600}
          />
        </motion.div>
      </div>

      <div className="px-3 md:px-20">
        <div
          className="relative w-full mx-auto rounded-3xl overflow-hidden px-8 md:px-12 py-10"
          style={{
            backgroundImage: 'url(/assets/plans-bg.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundPosition: 'center',
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16">
            <div className="max-w-xs shrink-0">
              <h3 className="font-anton text-2xl sm:text-4xl text-white uppercase leading-normal">
                Built to remove busywork
              </h3>
            </div>
            <div className="flex flex-1 gap-4">
              {works.map((w) => {
                const Icon = w.icon
                return (
                  <div
                    key={w.title}
                    className="p-5 min-w-60 rounded-2xl gradient-border-card"
                  >
                    <div className="flex gap-4 items-center">
                      <div
                        className="flex items-center justify-center rounded-full shrink-0"
                        style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          backgroundImage: `linear-gradient(#111214, #111214), linear-gradient(180deg, #666666 0%, #000000 100%)`,
                          backgroundOrigin: 'border-box, border-box',
                          backgroundClip: 'padding-box, border-box',
                          border: '1px solid transparent',
                        }}
                      >
                        <Icon
                          className="w-5 h-5 text-primary"
                          strokeWidth={2}
                        />
                      </div>
                      <div className="text-white font-archivo text-md">
                        {w.title}
                      </div>
                    </div>
                    <div className="mt-3 text-[#858585] font-archivo">
                      {w.description}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <OwnerDashboardSection />
      <RoleFeaturesSection />
      <ManagementFeaturesSection />
      <BranchManagementSection />
    </div>
  )
}

const SectionHeading = ({
  title,
  description,
  align = 'center',
}: {
  title: ReactNode
  description: string
  align?: 'center' | 'split'
}) => {
  if (align === 'split') {
    return (
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-10 lg:grid-cols-2 lg:items-start">
        <h2 className="font-anton text-3xl uppercase leading-tight text-white sm:text-4xl lg:text-[44px]">
          {title}
        </h2>
        <p className="max-w-2xl text-left text-lg leading-8 text-white/45 lg:ml-auto lg:text-right">
          {description}
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-5 text-center">
      <h2 className="font-anton text-3xl uppercase leading-[1.25] text-white sm:text-4xl lg:text-[42px]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
        {description}
      </p>
    </div>
  )
}

type FeaturePanelItem = {
  label: string
  title: string
  description: string
  image: string
  imageAlt: string
  fit: string
}

const FeatureTabs = ({
  tabs,
  activeIndex,
  onChange,
  indicatorId,
}: {
  tabs: FeaturePanelItem[]
  activeIndex: number
  onChange: (index: number) => void
  indicatorId: string
}) => (
  <div className="mx-auto mt-8 max-w-7xl px-5 md:px-10">
    <div className="flex gap-2 overflow-x-auto rounded-4xl border border-[#2D2D2D] bg-[#111214] p-1.5 scrollbar-none">
      {tabs.map((tab, index) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => onChange(index)}
          aria-pressed={activeIndex === index}
          className={`relative min-w-max flex-1 overflow-hidden rounded-[1.65rem] px-7 py-4 text-sm font-semibold transition-colors duration-300 sm:text-base ${
            activeIndex === index
              ? 'text-white'
              : 'text-white/75 hover:text-white'
          }`}
        >
          {activeIndex === index && (
            <motion.span
              layoutId={indicatorId}
              className="absolute inset-0 rounded-[1.65rem] gradient-border-mask  bg-linear-to-b from-[#1112142E] to-[#DDEB182E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]"
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  </div>
)

const FeaturePreviewPanel = ({ item }: { item: FeaturePanelItem }) => (
  <div className="mx-auto mt-8 max-w-7xl px-5 md:px-10">
    <div className="rounded-[1.7rem] border border-white/10 bg-[#151617] px-6 pt-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <h3 className="text-xl font-semibold text-white sm:text-2xl">
              {item.title}
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-white/45 sm:text-base lg:ml-auto">
              {item.description}
            </p>
          </div>
          <div className="relative -bottom-2 mt-3 h-85 overflow-hidden gradient-border-custom rounded-t-2xl p-0 bg-[#1b1c1c] sm:h-115 lg:h-135">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              className={`object-cover`}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
)

const OwnerDashboardSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeFeature = ownerFeatures[activeIndex]

  return (
    <section className="bg-[#080809] py-14 md:py-16">
      <SectionHeading
        align="split"
        title={
          <>
            Run Your Entire Gym From One Dashboard As A Gym{' '}
            <span className="text-primary">Owner</span>
          </>
        }
        description="From memberships and revenue to staff, equipment, and multiple locations, M4GYM gives gym owners complete control over every part of their business. Make smarter decisions with real-time insights, automate daily operations."
      />

      <div className="mx-auto mt-10 grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-[0.8fr_1.1fr] lg:items-center">
        <div>
          <div className="space-y-0">
            {ownerFeatures.map((feature, index) => (
              <button
                key={feature.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
                className={`flex min-h-20 w-full items-center border-b border-white/10 text-left text-lg transition-colors sm:text-xl ${
                  activeIndex === index
                    ? 'text-white'
                    : 'text-white/45 hover:text-white/75'
                }`}
              >
                <span
                  className={`mr-6 h-1 shrink-0 bg-primary transition-all ${
                    activeIndex === index ? 'w-10 opacity-100' : 'w-0 opacity-0'
                  }`}
                />
                <span>{feature.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-16">
            <CustomButton text="Get Started" className="cursor-pointer" />
          </div>
        </div>

        <OwnerImagePreview item={activeFeature} />
      </div>
    </section>
  )
}

const OwnerImagePreview = ({ item }: { item: FeaturePanelItem }) => (
  <div className="rounded-[1.6rem] border border-white/10 bg-[#1a1b1b] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-8">
    <div className="mb-6">
      <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
      <p className="mt-3 max-w-2xl text-base leading-7 text-white/45">
        {item.description}
      </p>
    </div>
    <div className="relative h-80 overflow-hidden rounded-[1.15rem] bg-black sm:h-105">
      <Image
        key={item.image}
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 1024px) 92vw, 650px"
        className={`transition-opacity duration-300 ${
          item.fit === 'cover' ? 'object-cover' : 'object-contain p-5'
        }`}
        priority={item.image === '/assets/dashboard-mockup.png'}
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/35" />
    </div>
  </div>
)

const RoleFeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTab = roleTabs[activeIndex]

  return (
    <section className="bg-[#080809] py-14 md:py-20">
      <SectionHeading
        title="The Features Every Role Depends On"
        description="Whether you're managing the business, coaching members, or checking in for your next workout, M4GYM provides a seamless experience with smart tools that save time, reduce manual work, and keep everyone on the same page."
      />
      <FeatureTabs
        tabs={roleTabs}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        indicatorId="role-features-tab-indicator"
      />
      <FeaturePreviewPanel item={activeTab} />
    </section>
  )
}

const ManagementFeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTab = managementTabs[activeIndex]

  return (
    <section className="bg-[#080809] py-14 md:py-20">
      <SectionHeading
        title={
          <>
            Empowering The Future Of Modern
            <br className="hidden sm:block" /> Fitness Management
          </>
        }
        description="M4GYM brings every part of your gym together-from members and trainers to payments, schedules, and operations-so your team can focus on delivering exceptional fitness experiences, not managing paperwork."
      />
      <FeatureTabs
        tabs={managementTabs}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        indicatorId="management-features-tab-indicator"
      />
      <FeaturePreviewPanel item={activeTab} />
    </section>
  )
}

const BranchManagementSection = () => (
  <section className="bg-[#080809] px-5 py-14 md:px-10 md:py-20">
    <div
      className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[1.6rem] border border-primary/10 p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
      style={{
        background:
          'radial-gradient(circle at 82% 35%, rgba(221,235,24,0.26), transparent 28%), linear-gradient(100deg, rgba(84,95,18,0.5), rgba(24,25,24,0.9) 34%, rgba(91,103,22,0.44))',
      }}
    >
      <div className="absolute inset-0 bg-[url('/assets/plans-bg.png')] bg-cover bg-center" />
      <div className="relative z-10 max-w-md">
        <h2 className="font-anton text-4xl uppercase leading-tight text-white sm:text-5xl">
          Branch Management
        </h2>
        <p className="mt-6 text-lg leading-8 text-white/50">
          run all your gym branches from one centralized dashboard with seamless
          switching.
        </p>
        <div className="mt-7">
          <CustomButton text="Get Started" />
        </div>
      </div>

      <div className="relative z-10 mt-12 min-h-57.5 lg:mt-0">
        <img
          src="/assets/branch-management-vector.png"
          alt=""
          className="absolute -z-10 right-0 -top-12 h-auto w-full pointer-events-none"
        />
        <div className="relative z-10">
          <BranchSwitch />
          <BranchCard
            className="mx-24"
            gym="IronPulse Fitness"
            enabled
            avatarClass="from-white/70 to-primary/30"
          />
          <BranchCard
            className="mx-auto mt-6"
            gym="Apex Strength Gym"
            avatarClass="from-cyan-300/60 to-white/20"
          />
        </div>
      </div>
    </div>
  </section>
)

const BranchSwitch = () => (
  <div className="absolute left-[47%] top-[38%] hidden h-14 w-14 items-center justify-center rounded-full text-black bg-[linear-gradient(180deg,#B7FF3C_0%,#DDEB18_100%)] shadow-[0px_4px_12px_0px_#00000040] lg:flex">
    <ArrowUpDown className="h-6 w-6" />
  </div>
)

const BranchCard = ({
  gym,
  enabled = false,
  className = '',
  avatarClass,
}: {
  gym: string
  enabled?: boolean
  className?: string
  avatarClass: string
}) => (
  <div
    className={`flex w-full max-w-lg items-center gap-4 rounded-xl bg-[#18191a] p-5 shadow-[0_16px_30px_rgba(0,0,0,0.32)] ${className}`}
  >
    <div className={`h-14 w-14 rounded-full bg-linear-to-br ${avatarClass}`} />
    <div>
      <h3 className="text-lg font-semibold text-white">{gym}</h3>
      <p className="mt-1 text-lg text-primary">Owner</p>
    </div>
    <div
      className={`ml-auto flex h-7 w-13 items-center rounded-full p-1 ${
        enabled ? 'justify-end bg-green-500' : 'justify-start bg-white/45'
      }`}
    >
      <span className="h-5 w-5 rounded-full bg-[#111]" />
    </div>
  </div>
)

export default FeaturesPage
