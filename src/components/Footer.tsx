export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink/10 dark:border-white/10">
      <div className="container py-8 text-center">
        <p className="text-sm text-ink/60 dark:text-paper/60">
          © {year} Manmeet Singh Hayer
        </p>
      </div>
    </footer>
  )
}
