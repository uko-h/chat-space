FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/publick/images/test_image.jpg")}
    user
    group
  end
end