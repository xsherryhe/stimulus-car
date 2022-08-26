class Car < ApplicationRecord
  validates :brand, presence: true
  has_many :variants

  accepts_nested_attributes_for :variants, reject_if: :all_blank

  def filled_variants?
    variants.any? { |variant| %i[name color].any? { |attr| variant[attr].present? } }
  end
end
