
describe "Simple radio", ->
    opts = 
        el: "#radio"

    beforeEach ->
        $("<input id='radio' type='radio'>").appendTo "body"

    afterEach ->
        $("#radio").remove()
        $(".simple-radio").remove()

    it "should inherit from SimpleModule", ->
        radio = simple.radio opts
        expect(radio instanceof SimpleModule).toBe(true)

    it "should throw Error when opts is invalid", ->
        radio = simple.radio
        expect(radio).toThrowError("simple-radio: el option is invalid");

    it "should render element when init", ->
        radio = simple.radio opts
        expect($("div.simple-radio")).toExist()
        expect($(".simple-radio>.dot")).toExist()
        expect($("#radio").css("display")).toBe("none")

    it "should set el size by opts", ->
        new_opts = 
            el: opts.el
            size: 60
        radio = simple.radio new_opts
        expect($("div.simple-radio").css("height")).toBe(60 + "px")
        expect($("div.simple-radio").css("width")).toBe(60 * 1.6 + "px")

    it "should set el size by prop", ->
        $("#radio").data("size", 60)
        radio = simple.radio opts
        expect($("div.simple-radio").css("height")).toBe(60 + "px")
        expect($("div.simple-radio").css("width")).toBe(60 * 1.6 + "px")

    it "should set default size when opts.size and data-size are invalid", ->
        radio = simple.radio opts
        expect(radio.size).toBe(32)

    it "should init class and value when render", ->
        $radio = $("#radio")
        $radio.attr("value", "on")
        radio = simple.radio opts
        $simple_radio = $("div.simple-radio")
        expect($radio.val()).toBe("on")
        expect($simple_radio).toHaveClass('on')

    it "should change class and value when function toggle invoke", ->
        radio = simple.radio opts
        $radio = $("#radio")
        $simple_radio = $("div.simple-radio")
        radio.toggle("on")
        expect($radio.val()).toBe("on")
        expect($simple_radio).toHaveClass('on')

    it "should disabled the el when the input disabled", ->
        $radio = $("#radio")
        $radio.attr("disabled", "disabled")
        radio = simple.radio opts
        $simple_radio = $("div.simple-radio")
        expect($simple_radio).toHaveClass('disabled')
        expect(radio.disabled).toBe(true)
        before_value = $radio.val()
        radio.toggle if before_value == "on" then "off" else "on"
        expect(before_value).toBe($radio.val())

    it "should diabled the el when function disable invoke with true", ->
        $radio = $("#radio")
        radio = simple.radio opts
        $simple_radio = $("div.simple-radio")
        radio.disable(true)
        expect($simple_radio).toHaveClass('disabled')
        expect(radio.disabled).toBe(true)
        before_value = $radio.val()
        radio.toggle if before_value == "on" then "off" else "on"
        expect(before_value).toBe($radio.val())

    it "should recovery the el when function disable invoke with false", ->
        $radio = $("#radio")
        $radio.attr("disabled", "disabled")
        radio = simple.radio opts
        $simple_radio = $("div.simple-radio")
        radio.disable(false)
        expect($simple_radio).not.toHaveClass('disabled')
        expect(radio.disabled).toBe(false)
        before_value = $radio.val()
        after_value = if before_value == "on" then "off" else "on"
        radio.toggle after_value
        expect($radio.val()).toBe(after_value)

    it "should toggle value and class on click", ->
        $radio = $("#radio")
        radio = simple.radio opts
        $simple_radio = $("div.simple-radio")
        $simple_radio.trigger 'click'
        expect($radio.val()).toBe("on")
        expect($simple_radio).toHaveClass("on")

    it "should ignore event when el is disabled", ->
        $radio = $("#radio")
        $radio.attr("disabled", "disabled")
        radio = simple.radio opts
        $simple_radio = $("div.simple-radio")
        $simple_radio.trigger "click"
        expect($radio.val()).toBe("off")
        expect($simple_radio).not.toHaveClass("on")

    it "should destroy when function destroy invoke", ->
        display = $("#radio").css("display")
        radio = simple.radio opts
        radio.destroy()
        expect($("div.simple-radio")).not.toExist()
        expect($("#radio").css("display")).toBe(display)
