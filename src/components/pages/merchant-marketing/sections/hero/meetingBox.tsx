import React from "react";
import { Typography } from "@/components/ui";

const styles = {
  meetingBox:
    "rounded-3xl border-[0.5px] border-white/20 p-6 flex flex-col gap-6 w-full lg:max-w-[500px] lg:ml-auto",
  meetingTitle: "font-semibold text-white",
  meetingFields: "flex md:items-center max-md:flex-col gap-6 mt-4",
  fieldCol: "flex-1 flex flex-col gap-2",
  label: "text-white text-xs",
  input:
    "bg-white/10 rounded-full border-[0.5px] border-[#ECECEC]/20 text-white font-light text-xs px-5 py-2.5 focus:outline-none placeholder:text-white",
  textarea:
    "bg-white/10 resize-none rounded-2xl border-[0.5px] border-[#ECECEC]/20 text-white font-light text-xs px-5 py-4 focus:outline-none placeholder:text-white",
  button:
    "py-2 text-black bg-[#9BCFB9] border border-element rounded-full cursor-pointer hover:opacity-80 mt-6",
};

const MeetingBox = () => {
  return (
    <div
      className={styles.meetingBox}
      style={{
        background:
          "linear-gradient(216.91deg, rgba(255, 255, 255, 0.08) -4.41%, rgba(0, 0, 0, 0.24) 56.8%)",
        border: "0.5px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(15.75px)",
      }}
    >
      <Typography level="h1" className={styles.meetingTitle}>
        Schedule a Meeting
      </Typography>

      <div className={styles.meetingFields}>
        <div className={styles.fieldCol}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            name="name"
            className={styles.input}
            placeholder="Enter Name"
          />
        </div>

        <div className={styles.fieldCol}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            className={styles.input}
            placeholder="Enter Email"
          />
        </div>
      </div>

      <div className={styles.fieldCol}>
        <label htmlFor="help" className={styles.label}>
          How can we help you?{" "}
        </label>
        <textarea
          name="help"
          className={styles.textarea}
          placeholder="Write your requirements..."
        />
      </div>

      <button className={styles.button}>Submit</button>
    </div>
  );
};

export default MeetingBox;
