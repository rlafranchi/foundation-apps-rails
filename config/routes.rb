Rails.application.routes.draw do
  root 'base#index'

  scope :api, {format: :json} do
    resources :posts
  end

  get '*path' => 'base#index'
end
