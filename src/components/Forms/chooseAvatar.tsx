"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Avatar1 from "../../../public/avatars/Avatar1.svg";
import Avatar2 from "../../../public/avatars/Avatar2.svg";
import Avatar3 from "../../../public/avatars/Avatar3.svg";
import Avatar4 from "../../../public/avatars/Avatar4.svg";
import Avatar5 from "../../../public/avatars/Avatar5.svg";
import Avatar6 from "../../../public/avatars/Avatar6.svg";
import Avatar7 from "../../../public/avatars/Avatar7.svg";
import Avatar8 from "../../../public/avatars/Avatar8.svg";
import Avatar9 from "../../../public/avatars/Avatar9.svg";
import Avatar10 from "../../../public/avatars/Avatar10.svg";
import Avatar11 from "../../../public/avatars/Avatar11.svg";
import Avatar12 from "../../../public/avatars/Avatar12.svg";
import Avatar13 from "../../../public/avatars/Avatar13.svg";
import Avatar14 from "../../../public/avatars/Avatar14.svg";
import Avatar15 from "../../../public/avatars/Avatar15.svg";
import Avatar16 from "../../../public/avatars/Avatar16.svg";

const avatars = [
  { id: 1, src: Avatar1 },
  { id: 2, src: Avatar2 },
  { id: 3, src: Avatar3 },
  { id: 4, src: Avatar4 },
  { id: 5, src: Avatar5 },
  { id: 6, src: Avatar6 },
  { id: 7, src: Avatar7 },
  { id: 8, src: Avatar8 },
  { id: 9, src: Avatar9 },
  { id: 10, src: Avatar10 },
  { id: 11, src: Avatar11 },
  { id: 12, src: Avatar12 },
  { id: 13, src: Avatar13 },
  { id: 14, src: Avatar14 },
  { id: 15, src: Avatar15 },
  { id: 16, src: Avatar16 },
];

interface ChooseAvatarProps {
  registerUser: any;
  isLoading: boolean;
}

const ChooseAvatar = ({ registerUser, isLoading }: ChooseAvatarProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Number | null>(null);

  return (
    <div className="avatar-selection mb-6">
      <label className="block font-medium mb-2">Choose an Avatar</label>
      <div className="grid grid-cols-4 gap-4">
        {avatars.map((avatar, index) => (
          <Image
            key={avatar.id}
            src={avatar.src}
            alt={"img"}
            width={100}
            height={100}
            onClick={() => setSelectedAvatar(avatar.id)}
            className={`w-16 h-16 cursor-pointer border-2 rounded-md ${selectedAvatar === avatar.id
                ? "border-cyan-500"
                : "border-transparent"
              }`}
          />
        ))}
      </div>
      <Button
        onClick={() => registerUser(selectedAvatar)}
        disabled={selectedAvatar === null || isLoading}
        className="bg-primary p-6"
        style={{ width: "-webkit-fill-available" }}
      >
        {isLoading ? "Loading..." : "Register"}
      </Button>
    </div>
  );
};

export default ChooseAvatar;
