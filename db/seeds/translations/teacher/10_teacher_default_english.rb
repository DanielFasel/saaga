# seeding all teacher pages
puts "Seeding Teacher default/english"
site = Site.find_by(name: 'Student')
# fetching the language of the translations
language = Language.find_by_language('english')

#fetching the default json file and parsing it
teacherDefaultEnPath = "#{Rails.root}/app/javascript/packs/assets/json/languages/teacher/teacher_en.json"
teacherDefaultEn = JSON.parse(File.read(teacherDefaultEnPath))

# seeding the pages from the default json hash
teacherDefaultEn.each do |key, value|
  site.pages.create(name: key, completed: 0, total: 0)
  puts "Page: #{key}"
  page=Page.find_by(name: key)
  # seeding words of the page
  puts "-> Seeding Words of #{key}"
  value.each do |key, value|
    page.words.create(keyword: key)
    word=Word.find_by(keyword: key)
    puts " => Word: #{key}"
    # Seeding the translation
    word.translations.create(translation: value, temporary: value, language_id: language.id, validated: false)
    puts " => Translation: #{value}"
  end
end
