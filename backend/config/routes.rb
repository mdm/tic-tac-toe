Rails.application.routes.draw do
  post 'auth/login'
  post 'auth/logout'
  get 'auth/check'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
