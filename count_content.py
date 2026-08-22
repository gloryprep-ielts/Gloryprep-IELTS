import re, os
os.chdir(os.path.expanduser("~/lexora/lexora/client/src/lib"))

def count(name, file, start="export const"):
    s = open(file).read()
    idx = s.index(start + " " + name)
    block = s[idx:]
    # find first top-level '[' then its matching ']'
    b = block.index("[")
    depth = 0
    for i, ch in enumerate(block[b:]):
        if ch == "[": depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                arr = block[b:b+i+1]
                break
    return arr.count("\n    {") + (1 if "{\n" in arr else 0)

print("lessons:", s208 := len(re.findall(r'"id": "listening-\d+"|"id": "reading-\d+"|"id": "writing-\d+"|"id": "speaking-\d+"', open("lessons.ts").read())))
for name, file in [("LISTENING_TESTS","practice/listening.ts"),("WRITING_PACKS","practice/writing.ts"),("SPEAKING_SETS","practice/writing.ts"),("READING_PASSAGES","practice/reading.ts")]:
    print(name, count(name, file))
