import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePlus, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccount } from '@/state/account';
import { useUser } from '@/state/user';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(60, 'Too long'),
  handle: z.string().trim().min(2, 'Pick a handle').max(20, 'Keep it short')
    .regex(/^[a-zA-Z0-9_.]+$/, 'Letters, numbers, _ or . only'),
});

const SignUp = () => {
  const nav = useNavigate();
  const { signUp } = useAccount();
  const { city } = useUser();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<string>(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'
  );

  const onFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
    const r = new FileReader();
    r.onload = () => setAvatar(r.result as string);
    r.readAsDataURL(file);
  };

  const submit = () => {
    const parsed = schema.safeParse({ name, handle });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    signUp({
      name: parsed.data.name,
      handle: '@' + parsed.data.handle.toLowerCase(),
      avatar,
      bio: bio.trim() || undefined,
      city: city ?? undefined,
    });
    toast.success('Welcome — your account is ready');
    nav(-1);
  };

  return (
    <div className="min-h-full bg-gradient-sky">
      <header className="px-4 pt-6 pb-3 flex items-center">
        <button onClick={() => nav(-1)} className="h-10 w-10 grid place-items-center rounded-full hover:bg-muted">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="ml-1 text-sm font-medium">Back</p>
      </header>

      <div className="px-6 pt-2 pb-6 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Create account</p>
        <h1 className="font-display text-3xl mt-1">Join the community</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          Comment, RSVP, share photos and connect with people of every tradition.
        </p>
      </div>

      <div className="px-6 space-y-4">
        <div className="flex justify-center">
          <button
            onClick={() => fileRef.current?.click()}
            className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-card shadow-elevated bg-muted"
          >
            <img src={avatar} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 grid place-items-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
              <ImagePlus className="h-6 w-6 text-white" />
            </div>
          </button>
          <input
            ref={fileRef} type="file" accept="image/*" hidden
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
        </div>
        <p className="text-center text-[11px] text-muted-foreground -mt-2">Tap to upload a photo</p>

        <label className="block">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            maxLength={60}
            className="mt-1 w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Handle</span>
          <div className="mt-1 flex items-center bg-card border border-border rounded-xl px-4 focus-within:border-primary">
            <span className="text-sm text-muted-foreground">@</span>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value.replace(/[^a-zA-Z0-9_.]/g, ''))}
              placeholder="yourname"
              maxLength={20}
              className="flex-1 py-3 text-sm bg-transparent focus:outline-none"
            />
          </div>
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Bio (optional)</span>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A line about you"
            maxLength={120}
            className="mt-1 w-full bg-card border border-border rounded-xl px-4 py-3 text-sm min-h-20 focus:outline-none focus:border-primary resize-none"
          />
        </label>

        <Button onClick={submit} size="lg" className="w-full h-14 rounded-full mt-2 shadow-elevated">
          Create account
        </Button>

        <p className="text-[11px] text-muted-foreground text-center pb-8">
          This is a demo — no email or password needed. Your account stays on this device.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
