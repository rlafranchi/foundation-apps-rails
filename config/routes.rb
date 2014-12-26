Rails.application.routes.draw do
  root 'base#index'

  scope :api, defaults: {format: :json} do
    resources :posts, except: [:edit, :new]
  end

  get '*path' => 'base#index'
end
