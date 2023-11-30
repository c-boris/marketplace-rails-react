# config/routes.rb

Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations',
               passwords: 'users/passwords'
             }
  # resources :properties
  get '/member-data', to: 'members#show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
resources :properties
devise_scope :user do
  put '/users/update_profile', to: 'users/registrations#update_profile', as: :update_profile
end
  # Defines the root path route ("/")
  # root "articles#index"
end