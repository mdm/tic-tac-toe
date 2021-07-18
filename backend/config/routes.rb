Rails.application.routes.draw do
  post 'auth/login'
  post 'auth/logout'
  get 'auth/check'

  post 'matches/:id', to: 'matches#move'
  post 'matches', to: 'matches#create'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
