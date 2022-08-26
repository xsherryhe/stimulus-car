Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :cars, except: [:destroy]
  # Defines the root path route ("/")
  # root "articles#index"
  root 'cars#index'
end
