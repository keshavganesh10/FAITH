import { useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAccount } from '@/state/account';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onOpenChange: (b: boolean) => void;
}

export const CreatePostSheet = ({ open, onOpenChange }: Props) => {
  const { account, addPost } = useAccount();
  const nav = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

  const onFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Please pick an image under 10MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = () => {
    if (!account) { nav('/signup'); return; }
    if (!image) { toast.error('Add a photo first'); return; }
    addPost(image, caption.trim());
    toast.success('Posted to your feed');
    setImage(null); setCaption('');
    onOpenChange(false);
  };

  if (!account) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-auto rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="font-display text-xl">Create an account to post</SheetTitle>
          </SheetHeader>
          <p className="text-sm text-muted-foreground mt-2">
            Share photos, comment, and RSVP — it takes a minute.
          </p>
          <Button className="w-full mt-4 rounded-full h-12" onClick={() => { onOpenChange(false); nav('/signup'); }}>
            Create account
          </Button>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[88vh] p-0 rounded-t-3xl flex flex-col">
        <SheetHeader className="px-5 pt-3 pb-2 border-b border-border flex-row items-center justify-between space-y-0">
          <button onClick={() => onOpenChange(false)} className="text-sm text-muted-foreground">Cancel</button>
          <SheetTitle className="text-base font-display">New post</SheetTitle>
          <button onClick={submit} className="text-sm font-semibold text-primary">Share</button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {image ? (
            <div className="relative aspect-square bg-black">
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <button onClick={() => setImage(null)}
                className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full bg-black/50 text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              className="aspect-square w-full bg-muted/40 border-2 border-dashed border-border grid place-items-center"
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ImagePlus className="h-10 w-10" />
                <p className="text-sm font-medium">Tap to choose a photo</p>
                <p className="text-[11px]">JPG or PNG · up to 10MB</p>
              </div>
            </button>
          )}
          <input
            ref={fileRef} type="file" accept="image/*" hidden
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />

          <div className="p-4 flex gap-3">
            <img src={account.avatar} className="h-10 w-10 rounded-full object-cover" alt="" />
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption…"
              maxLength={500}
              className="flex-1 min-h-24 bg-transparent text-sm focus:outline-none resize-none"
            />
          </div>
          <p className="px-4 -mt-2 text-[10px] text-muted-foreground text-right">{caption.length}/500</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
