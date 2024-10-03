export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full p-4 flex flex-col justify-center items-center">
      {children}
    </div>
  );
}
