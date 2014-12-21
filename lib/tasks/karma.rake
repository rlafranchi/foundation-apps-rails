namespace :karma  do
  task :start => :environment do
    with_tmp_config :start
  end

  task :run => :environment do
    with_tmp_config :start, "--single-run"
  end

  private

  def with_tmp_config(command, args = nil)
    system "./node_modules/karma/bin/karma #{command} spec/karma/config/unit.js #{args}"
  end
end
