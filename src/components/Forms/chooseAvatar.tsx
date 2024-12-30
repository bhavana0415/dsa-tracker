"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";

const ChooseAvatar = ({ registerUser, isLoading }) => {
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const avatars = Array.from(
    { length: 16 },
    (_, index) => `/avatars/Avatar${index + 1}.svg`
  );

  return (
    <div className="avatar-selection mb-6">
      <label className="block text-gray-700 font-medium mb-2">
        Choose an Avatar
      </label>
      <div className="grid grid-cols-4 gap-4">
        {avatars.map((avatar, index) => (
          <Image
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            onClick={() => setSelectedAvatar(avatar)}
            className={`w-16 h-16 cursor-pointer border-2 rounded-md ${
              selectedAvatar === avatar
                ? "border-cyan-500"
                : "border-transparent"
            }`}
          />
        ))}
      </div>
      <Button
        onClick={() => registerUser(selectedAvatar)}
        disabled={selectedAvatar == ""}
        className="text-white bg-red-600"
        style={{ width: "-webkit-fill-available" }}
      >
        {isLoading ? "Loading..." : "Register"}
      </Button>
    </div>
  );
};

export default ChooseAvatar;
