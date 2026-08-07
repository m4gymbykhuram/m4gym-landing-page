"use client";

import CustomButton from "@/app/components/CustomButton";
import { FeatureOwnerDashboardSection } from "@/app/components/features/OwnerDashboardSection";
import GlowBorderCard from "@/app/components/GlowBorderCard";
import ScrollExpand from "@/app/components/ScrollExpand";
import TitleWithLines from "@/app/components/TitleWithLines";
import { useScreenSize } from "@/hooks/useScreenSize";
import { containerVariants, fadeUp } from "@/lib/motion-variants";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";

const works = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Automate everyday tasks",
  },
  {
    icon: Clock,
    title: "Multi locations",
    description: "Manage every branch",
  },
  {
    icon: Clock,
    title: "Easy Attendance",
    description: "seamless check-ins",
  },
];

const roleTabs = [
  {
    label: "Calendar & Schedule",
    title: "Attendance & Calendar",
    description:
      "Manage staff schedules, member check-ins, and calendar activity from one shared role-friendly workspace.",
    image: "/assets/calendar.png",
    imageAlt: "Calendar and schedule preview",
    fit: "contain",
  },
  {
    label: "Profile Management",
    title: "Profile Management",
    description:
      "Give each role a clean profile view for member details, assigned plans, activity history, and next actions.",
    image: "/assets/member-bg.jpg",
    imageAlt: "Profile management preview",
    fit: "cover",
  },
  {
    label: "Activity & Updates",
    title: "Activity & Updates",
    description:
      "Keep managers, trainers, and members aligned with updates that make recent work easy to understand.",
    image: "/assets/dashboard-mockup.png",
    imageAlt: "Activity dashboard preview",
    fit: "contain",
  },
  {
    label: "Role-Based Access",
    title: "Role-Based Access",
    description:
      "Show owners, managers, trainers, and members only the tools and information they need.",
    image: "/assets/manager-bg.jpg",
    imageAlt: "Role based access preview",
    fit: "cover",
  },
];

const managementTabs = [
  {
    label: "Goals & Workout plans",
    title: "Goals & Workout Plans",
    description:
      "Create, assign, and adjust workout plans so trainers can guide every member with clearer goals.",
    image: "/assets/trainer-bg.jpg",
    imageAlt: "Workout plans preview",
    fit: "cover",
  },
  {
    label: "Attendance & Check In",
    title: "Attendance & Check In",
    description:
      "Support fast check-ins and clean attendance records for staff, members, and daily operations.",
    image: "/assets/calendar.png",
    imageAlt: "Attendance check-in preview",
    fit: "contain",
  },
  {
    label: "Payment Records",
    title: "Payment Records",
    description:
      "Keep payment history organized and visible so financial follow-up is simple for every branch.",
    image: "/assets/payment_records.png",
    imageAlt: "Payment records preview",
    fit: "contain",
  },
  {
    label: "Inventory & Stocks",
    title: "Inventory & Stocks",
    description:
      "Track stock movement, supplies, and inventory needs with a clear operational view.",
    image: "/assets/inventory.png",
    imageAlt: "Inventory stocks preview",
    fit: "contain",
  },
];

function DashboardBentoGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-8">
      {/* Row 1 */}
      <GlowBorderCard
        src="/assets/classes.png"
        alt="Classes panel"
        className="h-20! md:h-auto! md:col-span-2 lg:col-span-4"
      />

      <GlowBorderCard
        src="/assets/attendance.png"
        alt="Mark attendance panel"
        className="h-20! md:h-auto! rounded-xl object-cover w-full md:col-span-1 lg:col-span-2"
      />

      <GlowBorderCard
        src="/assets/notifications.png"
        alt="Notifications panel"
        className="h-20! md:h-auto! rounded-xl object-cover w-full md:col-span-1 lg:col-span-2"
      />

      {/* Row 2 */}
      <GlowBorderCard
        src="/assets/equipments.png"
        alt="Equipment's panel"
        className="rounded-xl w-full h-full md:col-span-1 lg:col-span-3"
      />

      <GlowBorderCard
        src="/assets/features-calender.png"
        alt="Drag & Drop Calendar panel"
        className="rounded-3xl w-full h-full col-span-2 md:col-span-3 lg:col-span-5"
      /> 
    </div>
  );
}

const FeaturesPage = () => {
  const { isMobile } = useScreenSize();
  return (
    <div className="relative w-full overflow-x-clip bg-[#080809]">
      {/* Hero Section */}
      <div className="relative bg-[#0A0A0B] z-10 w-full pt-28 px-4 lg:px-20 lg:pt-36 pb-16 flex flex-col md:flex-row items-center gap-12 lg:gap-8 flex-1">
        {/* Left glow */}
        <div
          className="
          absolute top-[20%] md:top-[40%] left-0 md:left-[8%]
          w-[320px] h-44
          bg-[#4a4a12]
          rounded-full
          blur-[100px]
          opacity-80
        "
        />

        {/* Right glow */}
        <div
          className="block
          absolute bottom-[1%] right-[16%]
          w-95 h-90
          bg-[#4a4a12]
          rounded-full
          blur-[110px]
          opacity-70
        "
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="relative w-full md:w-1/2 flex flex-col items-center md:items-start justify-center gap-4"
        >
          <motion.div variants={fadeUp}>
            <TitleWithLines
              title="Features"
              showLeftLine={isMobile ? true : false}
            />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-anton text-center md:text-start text-3xl md:text-3xl xl:text-[44px] uppercase text-white leading-tight"
          >
            Every part of your gym, in <br /> one system .
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="md:text-sm text-lg text-[#858585] max-w-125 text-center md:text-start"
          >
            Stop switching between spreadsheets, WhatsApp groups, payment apps,
            and attendance sheets. M4GYM keeps your owners, managers, trainers,
            and members connected in one powerful workspace.
          </motion.p>
          <motion.div variants={fadeUp}>
            <CustomButton text="Explore Features" className="cursor-pointer" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 relative flex items-center justify-center w-full max-w-3xl lg:max-w-none"
        >
          <DashboardBentoGrid />
        </motion.div>
      </div>

      {/* Built to remove busywork section */}
      <div className="px-3 lg:px-20 my-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full mx-auto rounded-3xl overflow-hidden px-8 md:px-12 py-10"
          style={{
            backgroundImage: "url(/assets/plans-bg.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 flex flex-col xl:flex-row md:items-center justify-between gap-8 lg:gap-6">
            <div className="max-w-xs shrink-0">
              <h3 className="font-anton text-2xl sm:text-4xl text-white uppercase leading-normal text-center md:text-start md:text-nowrap">
                Built to remove busywork
              </h3>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="flex flex-col md:flex-row md:justify-end flex-1 gap-4"
            >
              {works.map((w) => {
                const Icon = w.icon;
                return (
                  <motion.div
                    key={w.title}
                    variants={fadeUp}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="p-5 min-w-60 rounded-2xl gradient-border-card"
                  >
                    <div className="flex gap-4 items-center">
                      <div
                        className="flex items-center justify-center rounded-full shrink-0"
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          backgroundImage: `linear-gradient(#111214, #111214), linear-gradient(180deg, #666666 0%, #000000 100%)`,
                          backgroundOrigin: "border-box, border-box",
                          backgroundClip: "padding-box, border-box",
                          border: "1px solid transparent",
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
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="hidden md:flex m-0 h-screen w-full p-0">
        <ScrollExpand
          src="https://images.unsplash.com/photo-1641337221253-fdc7237f6b61?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero image"
          startWidth={42}
          startRadius={24}
          endRadius={0}
          mediaZoom={1.2}
          title="Welcome"
        >
          <div className="flex flex-col items-center justify-center">
            <h2 className="font-anton text-8xl uppercase leading-tight text-white">
              M4GYM
            </h2>
            <p className="max-w-2xl text-left text-lg leading-8 text-white/45 lg:ml-auto lg:text-right">
              M4GYM is a powerful gym management platform for owners, managers,
              trainers and members. Replace spreadsheets and paper attendance
              with one organized system.
            </p>
          </div>
        </ScrollExpand>
      </div>

      {/* Skiper Sticky Stacked Cards Component */}
      <FeatureOwnerDashboardSection />
      <RoleFeaturesSection />
      <ManagementFeaturesSection />
      <BranchManagementSection />
    </div>
  );
};

const SectionHeading = ({
  title,
  description,
  align = "center",
}: {
  title: ReactNode;
  description: string;
  align?: "center" | "split";
}) => {
  if (align === "split") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto grid max-w-7xl gap-8 px-5 md:px-10 lg:grid-cols-2 lg:items-start"
      >
        <h2 className="font-anton text-3xl uppercase leading-tight text-white sm:text-4xl lg:text-[44px]">
          {title}
        </h2>
        <p className="max-w-2xl text-left text-lg leading-8 text-white/45 lg:ml-auto lg:text-right">
          {description}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto max-w-3xl px-5 text-center"
    >
      <h2 className="font-anton text-3xl uppercase leading-tight text-white sm:text-4xl lg:text-[42px]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/45 sm:text-base">
        {description}
      </p>
    </motion.div>
  );
};

type FeaturePanelItem = {
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  fit: string;
};

const FeatureTabs = ({
  tabs,
  activeIndex,
  onChange,
  indicatorId,
}: {
  tabs: FeaturePanelItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  indicatorId: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mx-auto md:mt-4 mt-8 max-w-7xl lg:px-5"
  >
    <div className="flex gap-2 pl-5 lg:pl-0 overflow-x-auto lg:rounded-4xl lg:border border-[#2D2D2D] lg:bg-[#111214] lg:p-1.5 scrollbar-none">
      {tabs.map((tab, index) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => onChange(index)}
          aria-pressed={activeIndex === index}
          className={`relative min-w-max flex-1 overflow-hidden rounded-[1.65rem] px-7 py-4 text-sm font-semibold transition-colors duration-300 sm:text-base cursor-pointer ${
            activeIndex === index
              ? "text-white"
              : "text-white/75 hover:text-white bg-bg-elevated md:bg-transparent"
          }`}
        >
          {activeIndex === index && (
            <motion.span
              layoutId={indicatorId}
              className="absolute inset-0 rounded-[1.65rem] gradient-border-mask bg-linear-to-b from-[#1112142E] to-[#DDEB182E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]"
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  </motion.div>
);

const FeaturePreviewPanel = ({ item }: { item: FeaturePanelItem }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="mx-auto mt-8 md:mt-4 max-w-7xl px-5 lg:px-10"
  >
    <div className="rounded-[1.7rem] border border-white/10 bg-[#151617] px-6 pt-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <h3 className="text-xl font-semibold text-white sm:text-2xl text-center md:text-start">
              {item.title}
            </h3>
            <p className="max-w-2xl text-sm md:leading-7 text-white/45 sm:text-base lg:ml-auto text-center md:text-start">
              {item.description}
            </p>
          </div>
          <div className="relative -bottom-2 mt-3 h-85 overflow-hidden gradient-border-custom rounded-t-2xl p-0 bg-[#1b1c1c] sm:h-95 lg:h-135">
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
  </motion.div>
);

const RoleFeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = roleTabs[activeIndex];

  return (
    <section className="bg-[#080809] py-0 lg:py-20">
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
  );
};

const ManagementFeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = managementTabs[activeIndex];

  return (
    <section className="bg-[#080809] py-14 lg:py-20">
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
  );
};

const BranchManagementSection = () => (
  <section className="bg-[#080809] px-4 md:px-10 py-1 pb-10 lg:py-20">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[1.6rem] border border-primary/10 p-6 sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
      style={{
        background:
          "radial-gradient(circle at 82% 35%, rgba(221,235,24,0.26), transparent 28%), linear-gradient(100deg, rgba(84,95,18,0.5), rgba(24,25,24,0.9) 34%, rgba(91,103,22,0.44))",
      }}
    >
      <div className="absolute inset-0 bg-[url('/assets/plans-bg.png')] bg-cover bg-center" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative z-10 w-full lg:max-w-md"
      >
        <motion.h2
          variants={fadeUp}
          className="font-anton text-3xl uppercase leading-tight text-white sm:text-5xl text-center lg:text-start"
        >
          Branch Management
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-2 md:mt-6 text-lg leading-8 text-white/50 text-center lg:text-start"
        >
          run all your gym branches from one centralized dashboard with seamless
          switching.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-7 text-center lg:text-start"
        >
          <CustomButton text="Get Started" className="cursor-pointer" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 my-12 md:min-h-57.5 lg:mt-0"
      >
        <Image
          src="/assets/branch-management-vector.png"
          alt=""
          width={638}
          height={233}
          className="absolute -z-10 right-0 md:-top-12 h-auto w-full pointer-events-none"
        />
        <div className="relative z-10 px-8 md:px-0">
          <BranchSwitch />
          <BranchCard
            className="md:mx-24"
            gym="IronPulse Fitness"
            enabled
            avatarClass="from-white/70 to-primary/30"
          />
          <BranchCard
            className="mx-auto mt-6 md:mt-6"
            gym="Apex Strength Gym"
            avatarClass="from-cyan-300/60 to-white/20"
          />
        </div>
      </motion.div>
    </motion.div>
  </section>
);

const BranchSwitch = () => (
  <motion.div
    animate={{ y: [0, -4, 0] }}
    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
    className="absolute left-[45%] md:left-[47%] top-12 md:top-[38%] h-10 md:h-14 w-10 md:w-14 items-center justify-center rounded-full text-black bg-[linear-gradient(180deg,#B7FF3C_0%,#DDEB18_100%)] shadow-[0px_4px_12px_0px_#00000040] flex z-20"
  >
    <ArrowUpDown className="h-4 md:h-6 w-4 md:w-6" />
  </motion.div>
);

const BranchCard = ({
  gym,
  enabled = false,
  className = "",
  avatarClass,
}: {
  gym: string;
  enabled?: boolean;
  className?: string;
  avatarClass: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`flex w-full max-w-lg items-center gap-4 rounded-xl bg-[#18191a] p-2 md:p-5 shadow-[0_16px_30px_rgba(0,0,0,0.32)] ${className}`}
  >
    <div
      className={`h-10 md:h-14 w-10 md:w-14 rounded-full bg-linear-to-br ${avatarClass}`}
    />
    <div>
      <h3 className="text-sm md:text-lg font-semibold text-white">{gym}</h3>
      <p className="md:mt-1 text-xs md:text-lg text-primary">Owner</p>
    </div>
    <div
      className={`ml-auto flex h-5 md:h-7 w-10 md:w-13 items-center rounded-full p-1 ${
        enabled ? "justify-end bg-green-500" : "justify-start bg-white/45"
      }`}
    >
      <span className="h-4 md:h-5 w-4 md:w-5 rounded-full bg-[#111]" />
    </div>
  </motion.div>
);

export default FeaturesPage;
