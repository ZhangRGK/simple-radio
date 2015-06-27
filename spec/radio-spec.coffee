
describe 'Simple radio', ->

  it 'should inherit from SimpleModule', ->
    radio = simple.radio()
    expect(radio instanceof SimpleModule).toBe(true)
