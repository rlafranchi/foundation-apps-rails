# Run gulp automatically for dev servers

if defined?(Rails::Server) && Rails.env.development?
  pid = fork { exec('gulp') }

  at_exit do
    Process.kill('INT', pid)
    Process.waitpid(pid)
  end
end
