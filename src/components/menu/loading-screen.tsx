import { LOADING } from '@/constants/constant';
import { Coffee } from 'lucide-react';

export default function LoadingScreen() {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-background">
        <Coffee color="#674736"className="animate-bounce w-[20vw] h-[20vh]" />
        <p className="text-xl">{LOADING}</p>
      </div>
    );
  }