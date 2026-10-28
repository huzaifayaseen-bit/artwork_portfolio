"use client";

import React from "react";
import { ArtistProfile } from "@/types/portfolio";
import { DiscordCopyButton } from "@/components/contact/DiscordCopyButton";
import { ComicButton } from "@/components/ui/ComicButton";
import { Mail, Send, ExternalLink, MessageSquare } from "lucide-react";

export interface ContactSectionProps {
  profile: ArtistProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  return (
    <section id="contact" className="py-12 sm:py-16">
      <div className="border-[4px] border-black bg-white p-6 sm:p-12 shadow-neo-lg relative overflow-hidden">
        {/* Background Comic Decal Accent */}
        <div className="absolute top-0 right-0 bg-comic-yellow border-b-[3px] border-l-[3px] border-black px-4 py-1 font-nav text-xs font-bold uppercase tracking-wider">
          TRANSMISSION LINE
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Inquiry */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-comic-purple text-white border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000]">
              <MessageSquare className="w-4 h-4 fill-white" />
              DIRECT COMMUNICATIONS
            </div>
            <h2 className="font-comic text-5xl sm:text-7xl uppercase text-black tracking-wide leading-none">
              START A PROJECT
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-700 font-sans max-w-xl">
              Ready to commission a character, book cover, or sequence? Copy my direct Discord handle or launch an inquiry email with your project brief.
            </p>

            {/* Discord Copy Module */}
            <div className="mt-6">
              <label className="block font-nav text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                FASTEST RESPONSE // DISCORD DIRECT MESSAGE
              </label>
              <DiscordCopyButton discordTag={profile.discordTag} />
            </div>

            {/* Email Inquiry Action */}
            <div className="mt-6">
              <label className="block font-nav text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                OFFICIAL COMMISSION MAILBOX
              </label>
              <a
                href={`mailto:${profile.email}?subject=Commission%20Inquiry%20-%20Emilia%20Art`}
                className="inline-block"
              >
                <ComicButton
                  variant="secondary"
                  size="md"
                  icon={<Mail className="w-4 h-4" />}
                >
                  SEND EMAIL TO {profile.email.toUpperCase()}
                </ComicButton>
              </a>
            </div>
          </div>

          {/* Right Column: Social Channels & Footnote */}
          <div className="lg:col-span-5 bg-neutral-50 border-[3px] border-black p-6 shadow-neo-sm">
            <h3 className="font-comic text-2xl uppercase text-black mb-4 flex items-center gap-2 tracking-wide">
              <Send className="w-4 h-4 text-comic-pink" />
              VERIFIED CHANNELS
            </h3>

            <div className="space-y-2.5">
              {profile.socials.map((social) => {
                const isEmail = social.platform === "email";
                return (
                  <a
                    key={social.platform}
                    href={isEmail ? "#" : social.url}
                    onClick={
                      isEmail
                        ? (e) => {
                            e.preventDefault();
                            const el = document.getElementById("brief-builder");
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth" });
                            } else {
                              window.location.href = social.url;
                            }
                          }
                        : undefined
                    }
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    className="
                      flex items-center justify-between
                      bg-white border-2 border-black p-3.5
                      font-nav text-xs sm:text-sm font-bold uppercase text-black
                      shadow-neo-sm hover:shadow-neo hover:bg-comic-yellow
                      transition-all duration-75
                      hover:-translate-x-[1px] hover:-translate-y-[1px] tracking-wider cursor-pointer
                    "
                  >
                    <span>{social.label}</span>
                    <ExternalLink className="w-4 h-4 text-black stroke-[2.5]" />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-dashed border-neutral-300 text-xs font-nav text-neutral-500 font-medium uppercase tracking-wide">
              COMMISSION GUIDELINES: Turnaround times begin upon down-payment confirmation and final brief agreement.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
