class Variant < ApplicationRecord
  validates :name, presence: true
  belongs_to :car
end
