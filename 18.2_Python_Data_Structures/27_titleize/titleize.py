def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    i = 1
    after_space = False
    new_phrase = phrase[0].upper()
    while i < len(phrase):
        if phrase[i] == " ":
            new_phrase += " "
            after_space = True
            i += 1
        if after_space:
            new_phrase += phrase[i].upper()
            after_space = False
            i += 1
        else:
            new_phrase += phrase[i].lower()
            i += 1

    return new_phrase
    