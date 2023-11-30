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
  get '/users', to: 'members#get_all_users', as: 'users'  

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
resources :properties
  # Defines the root path route ("/")
  # root "articles#index"
end