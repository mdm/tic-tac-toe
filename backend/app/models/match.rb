class Match < ApplicationRecord
  belongs_to :noughts, class_name: 'Player'
  belongs_to :crosses, class_name: 'Player'
  has_many :moves
end
