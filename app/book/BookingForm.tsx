"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SlotPicker from "./SlotPicker";
import { formatFullDateTime } from "./booking-utils";

export interface BookingSubmitData {
  name: string;
  email: string;
  type: "Brand" | "Agency";
  company: string;
  whatBringsYouHere: string;
  whenToStart: string;
  heardAboutUs: string;
  website: string;
  instagram: string;
  linkedin: string;
  slotStart: string;
  visitorTimeZone: string;
  src?: string;
  lead?: string;
  honeypot?: string;
}

interface BookingFormProps {
  slots: string[];
  selectedSlot: string | null;
  onSelectSlot: (slotUtc: string) => void;
  timeZone: string;
  onTimeZoneChange: (tz: string) => void;
  loadingSlots: boolean;
  onSubmit: (data: BookingSubmitData) => Promise<void>;
  submitting: boolean;
  serverError: string | null;
  src?: string;
  lead?: string;
  clientType: "Brand" | "Agency";
  onTypeChange: (type: "Brand" | "Agency") => void;
}

const BRAND_BRINGS_YOU_HERE = [
  "We have a launch coming up",
  "We want ads that stand out from our category",
  "We need more ad content, faster",
  "We want to see if AI ads can work for us",
];

const AGENCY_BRINGS_YOU_HERE = [
  "We want to offer AI films to our clients as a new service",
  "Our clients are asking us for AI work",
  "We have a live brief or pitch we need help with",
  "We want faster production for our clients",
];

const WHEN_TO_START_OPTIONS = [
  "This month",
  "In the next 1–3 months",
  "Just exploring",
];

const HEARD_ABOUT_US_OPTIONS = [
  "An email from us",
  "Instagram",
  "LinkedIn",
  "Our website",
  "A friend or referral",
  "Other",
];

function normalizeInstagram(raw: string): string {
  const clean = raw.trim();
  if (!clean) return "";
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }
  const handle = clean.replace(/^@+/, "");
  return `https://instagram.com/${handle}`;
}

function normalizeWebsite(raw: string): string {
  const clean = raw.trim();
  if (!clean) return "";
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }
  return `https://${clean}`;
}

function normalizeLinkedIn(raw: string): string {
  const clean = raw.trim();
  if (!clean) return "";
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }
  if (clean.startsWith("linkedin.com/")) {
    return `https://${clean}`;
  }
  return `https://linkedin.com/company/${clean.replace(/^@+/, "")}`;
}

export default function BookingForm({
  slots,
  selectedSlot,
  onSelectSlot,
  timeZone,
  onTimeZoneChange,
  loadingSlots,
  onSubmit,
  submitting,
  serverError,
  src = "",
  lead = "",
  clientType,
  onTypeChange,
}: BookingFormProps) {
  // Step 1: Appointment booking (date & time slot picker)
  // Step 2: The question page (name, email, brand/agency, project details, socials)
  const searchParams = useSearchParams();
  const stepParam = searchParams?.get("step");
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (stepParam === "2") return 2;
    return 1;
  });

  // QUESTIONNAIRE FIELDS
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState<"Brand" | "Agency">(clientType || "Brand");

  // Keep type in sync with parent toggle
  useEffect(() => {
    if (clientType && clientType !== type) {
      setType(clientType);
      setWhatBringsYouHere("");
    }
  }, [clientType]);

  const [whatBringsYouHere, setWhatBringsYouHere] = useState("");
  const [whenToStart, setWhenToStart] = useState("");
  const [heardAboutUs, setHeardAboutUs] = useState("");

  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // Honeypot anti-spam trap
  const [honeypot, setHoneypot] = useState("");

  // Validation error states
  const [stepErrors, setStepErrors] = useState<{ [key: string]: string }>({});

  const handleTypeSelect = (selectedType: "Brand" | "Agency") => {
    if (selectedType !== type) {
      setType(selectedType);
      setWhatBringsYouHere("");
      onTypeChange(selectedType);
      setStepErrors((prev) => {
        const copy = { ...prev };
        delete copy.type;
        delete copy.whatBringsYouHere;
        return copy;
      });
    }
  };

  // Step 1 -> Step 2 validation
  const handleGoToStep2 = () => {
    if (!selectedSlot) {
      setStepErrors({ slot: "Please pick an available date and time slot first." });
      return;
    }
    setStepErrors({});
    setCurrentStep(2);

    const widget = document.getElementById("booking-widget");
    if (widget) {
      widget.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Step 2 validation
  const validateQuestions = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!name.trim()) {
      errors.name = "Please enter your name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Please enter your email.";
    } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!company.trim()) {
      errors.company = "Please enter your company name.";
    }

    if (!type) {
      errors.type = "Please select whether you are a brand or an agency.";
    }

    if (!whatBringsYouHere.trim()) {
      errors.whatBringsYouHere = "Please select what brings you here.";
    }

    if (!whenToStart.trim()) {
      errors.whenToStart = "Please select when you are looking to start.";
    }

    if (!heardAboutUs.trim()) {
      errors.heardAboutUs = "Please select where you heard about us.";
    }

    setStepErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }

    return true;
  };

  // Final submission on Step 2
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSlot) {
      setCurrentStep(1);
      setStepErrors({ slot: "Please select a date and time slot for your call." });
      return;
    }

    if (!validateQuestions()) {
      return;
    }

    setStepErrors({});

    const formattedInstagram = normalizeInstagram(instagram);
    const formattedWebsite = normalizeWebsite(website);
    const formattedLinkedIn = normalizeLinkedIn(linkedin);

    await onSubmit({
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      type: type as "Brand" | "Agency",
      whatBringsYouHere: whatBringsYouHere.trim(),
      whenToStart: whenToStart.trim(),
      heardAboutUs: heardAboutUs.trim(),
      website: formattedWebsite,
      instagram: formattedInstagram,
      linkedin: formattedLinkedIn,
      slotStart: selectedSlot,
      visitorTimeZone: timeZone,
      src,
      lead,
      honeypot,
    });
  };

  const currentBringsYouHereOptions =
    type === "Agency" ? AGENCY_BRINGS_YOU_HERE : BRAND_BRINGS_YOU_HERE;

  return (
    <div className="flex flex-col gap-6">
      {/* STEP PROGRESS HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1F1D1A]">
        {currentStep === 2 ? (
          <button
            type="button"
            onClick={() => {
              setStepErrors({});
              setCurrentStep(1);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#8B877F] hover:text-[#FFFFFF] transition-colors cursor-pointer py-1"
          >
            <span>←</span>
            <span>Change Date / Time</span>
          </button>
        ) : (
          <span className="text-xs font-mono uppercase tracking-widest text-[#8B877F]">
            1. Appointment Booking
          </span>
        )}

        <span className="text-xs font-mono uppercase tracking-widest text-[#8B877F]">
          {currentStep === 1 ? "Step 1 of 2: Pick Time" : "Step 2 of 2: Your Questions"}
        </span>
      </div>

      {/* Global Server Error Banner */}
      {serverError && (
        <div className="text-xs font-medium text-[#E62E30] border-l-2 border-[#E62E30] bg-[#100F0D] px-3.5 py-2.5">
          {serverError}
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 1: APPOINTMENT BOOKING (Select Date & Time)          */}
      {/* ======================================================== */}
      {currentStep === 1 && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#FFFFFF] tracking-tight">
              Select Date &amp; Time
            </h2>
            <p className="text-xs sm:text-sm text-[#8B877F]">
              30-minute discovery call on Google Meet with Prameet Patani. Pick a slot that works best for you.
            </p>
          </div>

          {/* Slot Picker Component */}
          <div className="flex flex-col gap-3">
            <SlotPicker
              slots={slots}
              selectedSlot={selectedSlot}
              onSelectSlot={(slotUtc) => {
                onSelectSlot(slotUtc);
                if (stepErrors.slot) {
                  setStepErrors((prev) => {
                    const c = { ...prev };
                    delete c.slot;
                    return c;
                  });
                }
              }}
              timeZone={timeZone}
              onTimeZoneChange={onTimeZoneChange}
              loading={loadingSlots}
            />

            {stepErrors.slot && (
              <p className="text-xs text-[#E62E30] font-medium pt-1">
                {stepErrors.slot}
              </p>
            )}
          </div>

          {/* Selection Capsule & Advance Button */}
          <div className="bg-gradient-to-b from-[#141210] to-[#100F0D] border border-[#2A2824] rounded-[4px] p-5 sm:p-6 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F1D1A]">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    selectedSlot ? "bg-[#E62E30] animate-pulse" : "bg-[#57534C]"
                  }`}
                />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B877F]">
                  {selectedSlot ? "SLOT SELECTED" : "SELECT A SLOT ABOVE"}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#1F1D1A] text-[#8B877F] border border-[#2A2824]">
                30M · GOOGLE MEET
              </span>
            </div>

            {selectedSlot ? (
              <div className="flex flex-col gap-1 py-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B877F]">
                  YOUR CHOSEN TIME ({timeZone.replace(/_/g, " ")})
                </span>
                <div className="text-base sm:text-lg font-bold text-[#FFFFFF] tracking-tight">
                  {formatFullDateTime(selectedSlot, timeZone)}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 py-1 text-xs text-[#8B877F]">
                <span className="text-sm font-bold text-[#E62E30]">‹</span>
                <span>Click any available time slot above to proceed to your details.</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleGoToStep2}
              className="group w-full inline-flex items-center justify-center gap-3 font-display text-xs sm:text-sm font-extrabold uppercase tracking-widest px-8 py-4 rounded-[2px] bg-gradient-to-r from-[#E62E30] to-[#C91C2B] text-[#FFFFFF] shadow-lg hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer select-none"
            >
              <span>Next: Your Details &amp; Questions</span>
              <span className="font-display text-sm font-extrabold transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: THE QUESTION PAGE (Details & Project Briefing)    */}
      {/* ======================================================== */}
      {currentStep === 2 && (
        <form onSubmit={handleFinalSubmit} noValidate className="flex flex-col gap-7">
          {/* Honeypot field (hidden from legitimate users) */}
          <input
            type="text"
            name="wib_hp_extra"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Chosen Slot Sticky Pill */}
          {selectedSlot && (
            <div className="bg-[#141210] border border-[#2A2824] border-l-2 border-l-[#E62E30] p-4 rounded-[2px] flex items-center justify-between gap-3 shadow-md">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B877F]">
                  SCHEDULED APPOINTMENT
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#FFFFFF]">
                  {formatFullDateTime(selectedSlot, timeZone)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-[11px] font-mono uppercase tracking-wider text-[#E62E30] hover:underline cursor-pointer shrink-0"
              >
                Change Slot
              </button>
            </div>
          )}

          {/* Header intro */}
          <div className="flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#FFFFFF] tracking-tight">
              Tell Us About Your Project
            </h2>
            <p className="text-xs sm:text-sm text-[#8B877F]">
              Help us prepare for our 30-minute discovery session so we can dive straight into your goals.
            </p>
          </div>

          {/* SECTION 1: CONTACT DETAILS */}
          <div className="flex flex-col gap-5 pt-2">
            {/* Question 1: Name */}
            <div id="field-name" className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#FFFFFF]">
                1. Your name <span className="text-[#E62E30]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (stepErrors.name) {
                    setStepErrors((prev) => {
                      const c = { ...prev };
                      delete c.name;
                      return c;
                    });
                  }
                }}
                placeholder="e.g. Maya Lin"
                className={`bg-[#100F0D] border ${
                  stepErrors.name ? "border-[#E62E30]" : "border-[#2A2824]"
                } px-3.5 py-3 rounded-[2px] text-xs sm:text-sm text-[#FFFFFF] placeholder:text-[#57534C] focus:outline-none focus:border-[#E62E30] transition-colors`}
              />
              {stepErrors.name && (
                <p className="text-xs text-[#E62E30] font-medium">
                  {stepErrors.name}
                </p>
              )}
            </div>

            {/* Question 2: Email */}
            <div id="field-email" className="flex flex-col gap-1.5">
              <div className="flex flex-col gap-0.5">
                <label className="text-xs font-bold text-[#FFFFFF]">
                  2. Your email <span className="text-[#E62E30]">*</span>
                </label>
                <p className="text-[11px] text-[#8B877F]">
                  We&apos;ll send the Google Meet room link and calendar invite here.
                </p>
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (stepErrors.email) {
                    setStepErrors((prev) => {
                      const c = { ...prev };
                      delete c.email;
                      return c;
                    });
                  }
                }}
                placeholder="maya@company.com"
                className={`bg-[#100F0D] border ${
                  stepErrors.email ? "border-[#E62E30]" : "border-[#2A2824]"
                } px-3.5 py-3 rounded-[2px] text-xs sm:text-sm text-[#FFFFFF] placeholder:text-[#57534C] focus:outline-none focus:border-[#E62E30] transition-colors`}
              />
              {stepErrors.email && (
                <p className="text-xs text-[#E62E30] font-medium">
                  {stepErrors.email}
                </p>
              )}
            </div>

            {/* Question 3: Company */}
            <div id="field-company" className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#FFFFFF]">
                3. Company / brand / project name <span className="text-[#E62E30]">*</span>
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (stepErrors.company) {
                    setStepErrors((prev) => {
                      const c = { ...prev };
                      delete c.company;
                      return c;
                    });
                  }
                }}
                placeholder="Acme Studio"
                className={`bg-[#100F0D] border ${
                  stepErrors.company ? "border-[#E62E30]" : "border-[#2A2824]"
                } px-3.5 py-3 rounded-[2px] text-xs sm:text-sm text-[#FFFFFF] placeholder:text-[#57534C] focus:outline-none focus:border-[#E62E30] transition-colors`}
              />
              {stepErrors.company && (
                <p className="text-xs text-[#E62E30] font-medium">
                  {stepErrors.company}
                </p>
              )}
            </div>

            {/* Question 4: Brand or Agency */}
            <div id="field-type" className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#FFFFFF]">
                4. Are you a brand or an agency? <span className="text-[#E62E30]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(["Brand", "Agency"] as const).map((opt) => {
                  const isSelected = type === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleTypeSelect(opt)}
                      className={`px-4 py-3 rounded-[2px] text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-2 border-[#E62E30] text-[#FFFFFF] bg-[#100F0D]"
                          : "border border-[#2A2824] text-[#D6D3CD] bg-[#100F0D] hover:border-[#57534C] hover:text-[#FFFFFF]"
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-[#E62E30]" : "border-[#2A2824]"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E62E30]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              {stepErrors.type && (
                <p className="text-xs text-[#E62E30] font-medium">
                  {stepErrors.type}
                </p>
              )}
            </div>
          </div>

          {/* SECTION 2: PROJECT QUESTIONS */}
          <div className="flex flex-col gap-6 pt-4 border-t border-[#1F1D1A]">
            {/* Question 5: What brings you here? */}
            <div id="field-whatBringsYouHere" className="flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <label className="text-xs font-bold text-[#FFFFFF]">
                  5. What brings you here? <span className="text-[#E62E30]">*</span>
                </label>
                <span className="text-[11px] text-[#8B877F]">
                  Showing options tailored for {type || "your team"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {currentBringsYouHereOptions.map((opt) => {
                  const isSelected = whatBringsYouHere === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setWhatBringsYouHere(opt);
                        if (stepErrors.whatBringsYouHere) {
                          setStepErrors((prev) => {
                            const c = { ...prev };
                            delete c.whatBringsYouHere;
                            return c;
                          });
                        }
                      }}
                      className={`p-3 rounded-[2px] text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-2 border-[#E62E30] text-[#FFFFFF] bg-[#100F0D]"
                          : "border border-[#2A2824] text-[#D6D3CD] bg-[#100F0D] hover:border-[#57534C] hover:text-[#FFFFFF]"
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`ml-2 w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                          isSelected ? "border-[#E62E30]" : "border-[#2A2824]"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E62E30]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              {stepErrors.whatBringsYouHere && (
                <p className="text-xs text-[#E62E30] font-medium">
                  {stepErrors.whatBringsYouHere}
                </p>
              )}
            </div>

            {/* Question 6: When are you looking to start? */}
            <div id="field-whenToStart" className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#FFFFFF]">
                6. When are you looking to start? <span className="text-[#E62E30]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {WHEN_TO_START_OPTIONS.map((opt) => {
                  const isSelected = whenToStart === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setWhenToStart(opt);
                        if (stepErrors.whenToStart) {
                          setStepErrors((prev) => {
                            const c = { ...prev };
                            delete c.whenToStart;
                            return c;
                          });
                        }
                      }}
                      className={`p-3 rounded-[2px] text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-2 border-[#E62E30] text-[#FFFFFF] bg-[#100F0D]"
                          : "border border-[#2A2824] text-[#D6D3CD] bg-[#100F0D] hover:border-[#57534C] hover:text-[#FFFFFF]"
                      }`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`ml-1.5 w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                          isSelected ? "border-[#E62E30]" : "border-[#2A2824]"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E62E30]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              {stepErrors.whenToStart && (
                <p className="text-xs text-[#E62E30] font-medium">
                  {stepErrors.whenToStart}
                </p>
              )}
            </div>

            {/* Question 7: Where did you hear about us? */}
            <div id="field-heardAboutUs" className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#FFFFFF]">
                7. Where did you hear about us? <span className="text-[#E62E30]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {HEARD_ABOUT_US_OPTIONS.map((opt) => {
                  const isSelected = heardAboutUs === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setHeardAboutUs(opt);
                        if (stepErrors.heardAboutUs) {
                          setStepErrors((prev) => {
                            const c = { ...prev };
                            delete c.heardAboutUs;
                            return c;
                          });
                        }
                      }}
                      className={`p-2.5 rounded-[2px] text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-2 border-[#E62E30] text-[#FFFFFF] bg-[#100F0D]"
                          : "border border-[#2A2824] text-[#D6D3CD] bg-[#100F0D] hover:border-[#57534C] hover:text-[#FFFFFF]"
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      <span
                        className={`ml-1.5 w-3.5 h-3.5 rounded-full border shrink-0 flex items-center justify-center ${
                          isSelected ? "border-[#E62E30]" : "border-[#2A2824]"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E62E30]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              {stepErrors.heardAboutUs && (
                <p className="text-xs text-[#E62E30] font-medium">
                  {stepErrors.heardAboutUs}
                </p>
              )}
            </div>
          </div>

          {/* SECTION 3: WORK & SOCIAL LINKS (OPTIONAL) */}
          <div className="flex flex-col gap-3 pt-4 border-t border-[#1F1D1A]">
            <div className="flex flex-col gap-0.5">
              <label className="text-xs font-bold text-[#FFFFFF]">
                8. Your website or socials{" "}
                <span className="text-[11px] text-[#8B877F] font-normal">(Optional)</span>
              </label>
              <p className="text-[11px] text-[#8B877F]">
                Add any you have, so we can review your work before the call.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B877F]">
                  Website
                </span>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="yourcompany.com"
                  className="bg-[#100F0D] border border-[#2A2824] px-3 py-2.5 rounded-[2px] text-xs text-[#FFFFFF] placeholder:text-[#57534C] focus:outline-none focus:border-[#E62E30] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B877F]">
                  Instagram
                </span>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@handle"
                  className="bg-[#100F0D] border border-[#2A2824] px-3 py-2.5 rounded-[2px] text-xs text-[#FFFFFF] placeholder:text-[#57534C] focus:outline-none focus:border-[#E62E30] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8B877F]">
                  LinkedIn
                </span>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="linkedin.com/company/..."
                  className="bg-[#100F0D] border border-[#2A2824] px-3 py-2.5 rounded-[2px] text-xs text-[#FFFFFF] placeholder:text-[#57534C] focus:outline-none focus:border-[#E62E30] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* FINAL SUBMIT BUTTON */}
          <div className="pt-4 border-t border-[#1F1D1A] flex flex-col items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="group w-full inline-flex items-center justify-center gap-3 font-display text-xs sm:text-sm font-extrabold uppercase tracking-widest px-8 py-4 rounded-[2px] bg-gradient-to-r from-[#E62E30] to-[#C91C2B] text-[#FFFFFF] shadow-xl hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 select-none"
            >
              <span>{submitting ? "Confirming your booking..." : "Confirm & Book Call"}</span>
              <span className="font-display text-sm font-extrabold transition-transform duration-300 group-hover:-translate-x-1">
                ‹
              </span>
            </button>

            <p className="text-xs text-[#8B877F] text-center leading-relaxed">
              Instant confirmation · Google Meet link &amp; calendar invite sent immediately to your email.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
