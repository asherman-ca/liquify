import { useUser } from "@/hooks/useUser";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface LikeButtonProps {
  coinId: string;
  initialLikedState: boolean;
  setCurLikes: (arg: any) => void;
}

const LikeButton: FC<LikeButtonProps> = ({
  coinId,
  initialLikedState,
  setCurLikes,
}) => {
  const router = useRouter();
  const { user, supabase } = useUser();
  const [isLiked, setIsLiked] = useState<boolean>(initialLikedState);

  useEffect(() => {
    setIsLiked(initialLikedState);
  }, [initialLikedState]);

  // useEffect(() => {
  //   if (!user) {
  //     return;
  //   }

  //   const fetchLike = async () => {
  //     const { data, error } = await supabase
  //       .from("likes")
  //       .select("*")
  //       .eq("user_id", user.id)
  //       .eq("coin_id", coinId)
  //       .single();

  //     if (data && !error) {
  //       setIsLiked(true);
  //     }
  //   };

  //   fetchLike();
  // }, [coinId, user]);

  const handleLike = async () => {
    if (!user) {
      return;
    }

    if (isLiked) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("user_id", user.id)
        .eq("coin_id", coinId);

      if (!error) {
        setIsLiked(false);
        setCurLikes((prev: string[]) => prev.filter((id) => id !== coinId));
      }
    } else {
      const { error } = await supabase.from("likes").insert([
        {
          user_id: user.id,
          coin_id: coinId,
        },
      ]);

      if (!error) {
        setIsLiked(true);
        setCurLikes((prev: string[]) => [...prev, coinId]);
        toast.success("Added to watchlist");
      }
    }
  };

  return (
    <div className="flex w-full justify-end">
      <button
        onClick={() => {
          if (!user) {
            router.push("/login");
          } else {
            handleLike();
          }
        }}
      >
        <Star
          className="text-blue-500"
          fill={`${isLiked ? "blue-300" : "white"}`}
        />
      </button>
    </div>
  );
};

export default LikeButton;
