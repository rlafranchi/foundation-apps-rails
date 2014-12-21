Rails.application.routes.draw do
  root 'base#index'

  get '*path' => 'base#index'
end
