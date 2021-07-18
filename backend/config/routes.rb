Rails.application.routes.draw do
  post 'auth/login'
  post 'auth/logout'
  get 'auth/check'

  post 'matches/create'
  post 'matches/move'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
