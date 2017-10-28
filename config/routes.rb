Rails.application.routes.draw do
  resources :settings
  resources :people
  devise_for :users
  root "home#index"

  get "tarot" => "tarot#index"
  get "about" => "about#index"
  get "meaning" => "meaning#index"
  get "1" => "tarot1#index"
  get "2" => "tarot2#index"
  get "3" => "tarot#index"
  get "4" => "tarot4#index"
  get "5" => "tarot5#index"
  get "6" => "tarot6#index"
  get "7" => "tarot7#index"


end
